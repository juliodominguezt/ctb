 
import venom from "venom-bot";
import dialogflow from "./dialogflow.js";
 
const list = [
    {
      title: "GLAMPING QUIMULÁ",
      rows: [
        {
          title: "GLAMPING QUIMULÁ",
          description: "*Quimulá* es el Glamping más cercano a nuestra plazoleta, tiene una hermosa vista a las montañas y al casco urbano de Barbosa. Tiene cama doble, baño privado con ducha de agua caliente, dos sillones al frente del ventanal para sentarte a charlar o simplemente deleitarte con la vista y un balcón con jacuzzi privado para relajarte.      "
,
        }
      ]
    },
    {
      title: "GLAMPING CARBONERO",
      rows: [
        {
          title: "GLAMPING CARBONERO",
          description: "*Carbonero* como los otros Glamping, tiene una hermosa vista a las montañas y al casco urbano de Barbosa. Tiene cama doble, baño privado con ducha de agua caliente, un lindo sillón al frente del ventanal, para sentarte a charlar o simplemente deleitarte con la vista, pero su balcón a diferencia de los otros tiene un toque especial, que es un hermoso árbol incrustado al lado del jacuzzi.",
        },
       
      ]
    },
    {
      title: "GLAMPING ESCAMPADERO",
      rows: [
        {
          title: "GLAMPING CARBONERO",
          description: "*Carbonero* como los otros Glamping, tiene una hermosa vista a las montañas y al casco urbano de Barbosa. Tiene cama doble, baño privado con ducha de agua caliente, un lindo sillón al frente del ventanal, para sentarte a charlar o simplemente deleitarte con la vista, pero su balcón a diferencia de los otros tiene un toque especial, que es un hermoso árbol incrustado al lado del jacuzzi.",
        },
       
      ]
    }
  ];
   
venom
  .create({
    session: 'session-name', //name of session
    multidevice: true ,// for version not multidevice use false.(default: true)
    headless: false
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async(message) => {


    if ( message.isGroupMsg === false) {
      console.log('entro: ', message.body);
      if (typeof  message.body === 'string' ||  message.body instanceof String)
      {
      if ( message.body.length < 255)
      {
      
        let pl= await dialogflow.sendToDialogFlow(message.body,"123")
        let resp = pl.fulfillmentMessages;
        for (const i  of resp){
              
            client
                 .sendText(message.from, i.text.text[0] )
            .then((retorno) => {
              resp = retorno;
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    }
 
          // Send message with options
       

    }
  
  


    if (message.body === 'Holis bot' && message.isGroupMsg === false) {
      client
        .sendText(message.from, '¡Hola!. 😊 Gracias por comunicarte con Ancestral Glamping. 🍃')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
        client.sendListMenu(message.from, 'Title', 'subTitle', 'Description', 'menu', list)
        client
        .sendImage(
          message.from,
          'resourses/gatos.png',
          'image-name',
          'Caption text'
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
 

}

// Send List menu
//This function does not work for Bussines contacts


});
}



 
