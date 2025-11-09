from flask import Flask, request, render_template, session
import logica


def crear_app():
    app = Flask(__name__)
    app.secret_key = 'clavesecreta'
    
    @app.route('/')
    def menuprincipal():
        return render_template('menu.html')

    @app.route('/crear_grafo_manual')
    def crear_grafo_manual():
        return render_template('grafo_manual.html')

    @app.route('/crear_grafo_aleatorio', methods=['GET', 'POST'])
    def crear_grafo_aleatorio():
        return render_template('grafo_aleatorio.html')
    
    @app.route('/generar_grafo_aleatorio', methods=['GET', 'POST'])
    def generar_grafo_aleatorio():
        
        nodos = int(request.form.get('nodos'))
        print(nodos)
        grafo=logica.generar_grafo_aleatorio(nodos)
        return render_template('menu.html')
    
    return app
if __name__ == '__main__':
    app = crear_app()
    app.run(debug=True)