"""Create default immutable templates"""

from django.db import migrations, models
import uuid
import json

def create_default_templates(apps, schema_editor):
    Template = apps.get_model('project', 'Template')
    User = apps.get_model('accounts', 'User')
    # Assuming there is at least one superuser; if not, created_by will be None
    owner = User.objects.filter(is_staff=True).first()
    defaults = [
        {
            "name": "Data Science Starter",
            "description": "Basic data‑science stack with Python, pandas, NumPy.",
            "category": "DataScience",
            "visibility": "private",
            "config": {
                "stack": ["Python"],
                "datascience": ["pandas", "numpy"],
                "frameworks": [],
                "required_tools": ["Jupyter"],
            },
        },
        {
            "name": "Web Stack",
            "description": "Full‑stack JavaScript with Node.js and React.",
            "category": "Web",
            "visibility": "private",
            "config": {
                "stack": ["Node.js", "React"],
                "datascience": [],
                "frameworks": ["Express", "Next.js"],
                "required_tools": ["npm"],
            },
        },
        {
            "name": "ML Ops",
            "description": "Machine‑learning ops with Docker and TensorFlow.",
            "category": "ML",
            "visibility": "private",
            "config": {
                "stack": ["Python"],
                "datascience": ["scikit-learn"],
                "frameworks": ["TensorFlow"],
                "required_tools": ["Docker"],
            },
        },
    ]
    for tmpl in defaults:
        Template.objects.create(
            id=uuid.uuid4(),
            name=tmpl["name"],
            description=tmpl["description"],
            category=tmpl["category"],
            created_by=owner,
            visibility=tmpl["visibility"],
            config=tmpl["config"],
            is_system=True,
            is_active=True,
        )

def delete_default_templates(apps, schema_editor):
    Template = apps.get_model('project', 'Template')
    Template.objects.filter(is_system=True).delete()

class Migration(migrations.Migration):
    dependencies = [
        ('project', '0002_alter_template_config'),
    ]
    operations = [
        migrations.RunPython(create_default_templates, reverse_code=delete_default_templates),
    ]
