import json
from pathlib import Path
from graphify.build import build_from_json
from networkx.readwrite import json_graph
import networkx as nx

# Load graph
data = json.loads(Path('graphify-out/graph.json').read_text())
G = json_graph.node_link_graph(data, edges='links')

question = 'Why does User connect Community 0 to Community 2?'
terms = [t.lower() for t in question.split() if len(t) > 3]

# Find start nodes matching terms
scored = []
for nid, ndata in G.nodes(data=True):
    label = ndata.get('label', '').lower()
    score = sum(1 for t in terms if t in label)
    if score > 0:
        scored.append((score, nid))
scored.sort(reverse=True)
start_nodes = [nid for _, nid in scored[:3]]
if not start_nodes:
    print('No matching nodes')
    exit(0)

# BFS up to depth 3
subgraph_nodes = set(start_nodes)
subgraph_edges = []
frontier = set(start_nodes)
for _ in range(3):
    next_frontier = set()
    for n in frontier:
        for neighbor in G.neighbors(n):
            if neighbor not in subgraph_nodes:
                next_frontier.add(neighbor)
                subgraph_edges.append((n, neighbor))
                subgraph_nodes.add(neighbor)
    frontier = next_frontier

# Output
lines = [f'Traversal: BFS | Start: {[G.nodes[n].get("label", n) for n in start_nodes]} | {len(subgraph_nodes)} nodes']
for nid in subgraph_nodes:
    d = G.nodes[nid]
    lines.append(f'  NODE {d.get("label", nid)} [src={d.get("source_file", "")} loc={d.get("source_location", "")} ]')
for u, v in subgraph_edges:
    if G.has_edge(u, v):
        ed = G.edges[u, v]
        lines.append(f'  EDGE {G.nodes[u].get("label", u)} --{ed.get("relation", "")}--> {G.nodes[v].get("label", v)} [{ed.get("confidence", "")} ]')
print('\n'.join(lines))