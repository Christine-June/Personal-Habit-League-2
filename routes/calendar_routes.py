from flask_restful import Resource
from flask import request
from models import HabitEntry, ChallengeEntry
from config import db

class CalendarEntriesResource(Resource):
    def get(self):
        user_id = request.args.get("user_id", type=int)
        if not user_id:
            return {"error": "user_id is required"}, 400

        # Fetch habit entries for the user
