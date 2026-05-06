import uuid
from django.core.management.base import BaseCommand, CommandError

from accounts.serializers import UserSerializer


class Command(BaseCommand):
    help = "Create a number of test users (10-20) with valid data."

    def add_arguments(self, parser):
        parser.add_argument(
            "--count",
            type=int,
            default=10,
            help="Number of users to create (must be between 10 and 20).",
        )

    def handle(self, *args, **options):
        count = options["count"]
        if count < 10 or count > 20:
            raise CommandError("Count must be between 10 and 20.")

        created = 0
        for i in range(count):
            # Generate a unique username and email
            while True:
                username = f"user_{uuid.uuid4().hex[:8]}"
                email = f"{username}@example.com"
                # Password meeting custom validation rules
                password = "TestPass123!"
                data = {
                    "username": username,
                    "email": email,
                    "password": password,
                    "confirm_password": password,
                }
                serializer = UserSerializer(data=data)
                if serializer.is_valid():
                    serializer.save()
                    created += 1
                    self.stdout.write(self.style.SUCCESS(f"Created user {username}"))
                    break
                else:
                    # If validation fails (e.g., duplicate username), retry with a new one.
                    self.stderr.write(f"Validation error for {username}: {serializer.errors}")
                    # continue loop to generate another username
        self.stdout.write(self.style.SUCCESS(f"Successfully created {created} user(s)."))
