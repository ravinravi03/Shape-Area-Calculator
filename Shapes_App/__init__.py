from flask import Flask

def create_app():
    app = Flask(__name__)

    from .views import views
    from .calculate import calculate

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(calculate, url_prefix='/calculate')

    
    return app