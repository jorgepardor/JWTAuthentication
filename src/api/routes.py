"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

def create_token(username, password):
    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        return None
    else:
       return create_access_token(identity=user.id)

@api.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    try:
        token = create_token(username, password)
        return jsonify({"token": token}), 200
    except:
        return jsonify({"message": "The login was unsuccessful"}), 400

@api.route("/register", methods=["POST"])
def register():
    username = request.json.get("username")
    password = request.json.get("password")

    try:
        user = User(username=username, password=password)
        db.session.add(user)
        db.session.commit()
        token = create_token(username, password)
        return jsonify({"token": token}), 200
    except:
        return jsonify({"message": "There was a problem creating an user"}), 400

@api.route("/validate", methods=["GET"])
@jwt_required()
def handle_validate():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        return jsonify({"validate": True}), 200
    else:
        return jsonify({"validate": False}), 400

@api.route("/dashboard", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200

