import { create } from 'zustand';
import axios from 'axios';

interface Template {
  id: number | string;
  name: string;
  description?: string;
  // Add any other fields expected from API
  [key: string]: any;
}

interface TemplateState {
  templates: Template[];
  isLoading: boolean;
  error: string | null;
  selectedTemplate: Template | null;
}

interface TemplateActions {
  fetchTemplates: () => Promise<void>;
  setSelectedTemplate: (template: Template | null) => void;
}

const API_BASE = 'http://localhost:8000';

const useTemplateStore = create<TemplateState & TemplateActions>((set) => ({
  templates: [],
  isLoading: false,
  error: null,
  selectedTemplate: null,
  fetchTemplates: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE}/project/templates/`);
      set({ templates: response.data, isLoading: false });
    } catch (e: any) {
      const msg = e?.response?.data?.detail || e.message || 'Failed to fetch templates';
      set({ error: msg, isLoading: false });
    }
  },
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
}));

export default useTemplateStore;
