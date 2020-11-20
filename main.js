//Botones
var btAgregar = document.querySelector("#btAgregar");
var btBorrar = document.querySelector("#btBorrar");
var btBorrarPri = document.querySelector("#btBorrarPri")
var btBuscar = document.querySelector("#btBuscar");
var btListar = document.querySelector("#btListar");
var btListarIn = document.querySelector("#btListarIn");

//Inputs
var codigo = document.querySelector("#codigoPro");
var nombre = document.querySelector("#nombrePro");
var descripcion = document.querySelector("#descPro");
var costo = document.querySelector("#costoPro");
var cantidad = document.querySelector("#cantPro");
var borrarPro = document.querySelector("#borrarPro");
var buscarPro = document.querySelector("#buscarPro");
var lista = document.querySelector("#listado");

class Producto{
    constructor(codigo, nombre, descripcion, costo, cantidad){
        this.codigo = codigo;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.costo = costo;
        this.cantidad = cantidad;
        this.siguiente = null;
        this.anterior = null;
    }

    valor(){
        let cantidad = this.cantidad;
        let costo = this.costo;
        let valor = cantidad * costo;
        return valor;
    }

    articleToHtml(){
        let productString = '<li class="list-group-item">';
        for(let key in this){
            productString += `<div><strong>${key}:</strong> ${this[key]}</div>`;
        }
        let valor_string = `<div><strong>Valor Total:</strong> ${this.valor()}</div>`;
        return productString + valor_string + "</li>";
    }
}

class Inventario{
    constructor(){
        this.inicio = null;
        this.fin = null;
        this.tamaño = 0;
    }

    agregarP(nuevo){
        if(!this.inicio){
            this.inicio = nuevo;
            this.fin = nuevo;
            return (nuevo, this.listaP());
        }else{
            let aux = this.inicio;
            let done = false;
            while(!done){
                if(nuevo.codigo < aux.codigo){
                    nuevo.siguiente = aux;
                    nuevo.anterior = aux.anterior;
                    aux.anterior = nuevo;
                    if(aux.codigo === this.inicio.codigo){
                        nuevo.anterior = nuevo;
                        this.inicio = nuevo;
                    }
                    done = true;
                }else
                if(!aux.siguiente){
                    aux.siguiente = nuevo;
                    nuevo.anterior = aux;
                    this.fin = nuevo;
                    done = true;
                }else{
                    aux = aux.siguiente;
                }
            }
            this.listaP();
        }
    }
        
    borrarInicio(){
        if(!this.inicio){
            return null;
        }
        const aux = this.inicio.codigo;
        if(this.inicio === this.fin){
            this.inicio = null;
            this.fin = null
        }else{
            this.inicio = this.inicio.siguiente;
            this.inicio.anterior = null;
        }
        this.tamaño--;
        return (aux, this.listaP());
    }

    borrarP(codigo){
        let aux = this.inicio;
        let temp = null;

        while(aux !== null){
            if(aux.codigo === codigo){
                if(!temp){
                    return this.borrarInicio();
                } else
                if(!aux.siguiente){
                    if(!this.fin){
                        return null;
                    }
                    const aux2 = this.fin.codigo;
                    if(this.inicio === this.fin){
                        this.inicio = null;
                        this.fin = null;
                    }else{
                        this.fin = this.fin.anterior;
                        this.fin.siguiente = null;
                    }
                    this.tamaño--;
                    return (aux2, this.listaP());
                }else{
                    temp.siguiente = aux.siguiente;
                    aux.siguiente.anterior = temp;
                }
                this.tamaño--;
                return (this.listaP(), aux.codigo);
            }
            temp = aux;
            aux = aux.siguiente;
        }
        return null;    
    }

    buscarP(codigo){
        lista.innerHTML = "";
        if(this.inicio !== null){
            let aux = this.inicio;
            
            while(aux != null){
                if(aux.codigo == codigo){
                    lista.innerHTML += aux.articleToHtml();
                }
                aux = aux.siguiente;
            }
        }
    }

    listaP() {
        lista.innerHTML = "";
        let aux = this.inicio;
        while(aux){   
            lista.innerHTML += aux.articleToHtml();
            aux = aux.siguiente;
        }
    }

    listaPIn() {
        lista.innerHTML = "";
        let aux = this.fin;
        while(aux){
            lista.innerHTML += aux.articleToHtml();
            aux = aux.anterior;
        }
    }
}

let inventario = new Inventario();

//Agregar
btAgregar.addEventListener("click", () => {
    let newProdcuto = new Producto(Number(codigo.value), nombre.value, descripcion.value, costo.value, cantidad.value);
    inventario.agregarP(newProdcuto);
    console.log(inventario);
    document.getElementById("form_1").reset();
});

//Borrar
btBorrar.addEventListener("click", () => {
  inventario.borrarP(borrarPro.value);
  document.getElementById("form_2").reset();
  
});

//Borrar Inicio
btBorrarPri.addEventListener("click", () => {
    inventario.borrarInicio();
})

//Buscar
btBuscar.addEventListener("click", () => {
  inventario.buscarP(buscarPro.value);
  document.getElementById("form_3").reset();
});

//Lista
btListar.addEventListener("click", () => {
  inventario.listaP();
});

//Listar inverso
btListarIn.addEventListener("click", () => {
  inventario.listaPIn();
});
