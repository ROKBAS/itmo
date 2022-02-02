from django.views.generic import TemplateView
from counter.models import Counter
import os
import socket


class HomeView(TemplateView):
    template_name = "index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        counter: Counter = Counter.objects.first()
        count = counter.count
        context["value"] = count
        return context


class StatView(TemplateView):
    template_name = "stat.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        counter: Counter = Counter.objects.first()
        context["value"] = counter.count
        counter.count += 1
        counter.save()
        return context


class AboutView(TemplateView):
    template_name = "about.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["hostname"] = socket.gethostname()
        context["name"] = os.getenv("NAME", "world")
        return context
