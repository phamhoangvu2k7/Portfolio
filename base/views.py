from django.shortcuts import render
from django.http import JsonResponse
from .models import Project

def home(request):
    projects = Project.objects.all() 
    context = {'projects': projects}
    
    return render(request, 'base/home.html', context)

def get_projects(request):
    projects = Project.objects.all()
    project_list = []
    for project in projects:
        project_list.append({
            'id': project.id,
            'title': project.title,
            'description': project.description,
            'link': project.link,
            'image_url': getattr(project, 'image_url', ''), # Safeguard if image_url isn't implemented as a CharField/URLField
        })
    return JsonResponse(project_list, safe=False)