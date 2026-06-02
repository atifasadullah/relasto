from django.conf import settings
from djoser import email as djoser_email
from .tasks import deliver_email


class CeleryEmailMixin:
    def send(self, to, *args, **kwargs):
        self.render()
        from_email = settings.DEFAULT_FROM_EMAIL
        deliver_email.delay(
            subject=self.subject,
            body=self.body,
            to=to,
            from_email=from_email,
            html_message=self.html,
        )


class ActivationEmail(CeleryEmailMixin, djoser_email.ActivationEmail):
    template_name = "email/activation.html"


class PasswordResetEmail(CeleryEmailMixin, djoser_email.PasswordResetEmail):
    template_name = "email/reset_password.html"
