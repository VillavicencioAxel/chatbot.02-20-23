const axios = require('axios').default;
const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
} = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')


const flujoAtencionClien = addKeyword('atencion')
    .addAnswer('En breve lo contactamos...')

const flujoPolo = addKeyword("polo")
    .addAnswer("Polos animados de marvel", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/polo1.jpg" })
    .addAnswer("Polos urbanos colores claros y oscuros", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/polo2.jpg" })
    .addAnswer("Polos umbro, colores blanco, negro y plomo", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/polo3.jpg" })

const flujoPantalon = addKeyword("pantalon")
    .addAnswer("foto1", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/pant1.jpg" })
    .addAnswer("foto2", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/pant2.jpeg" })
    .addAnswer("foto3", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/pant3.jpg" })

const flujoShort = addKeyword("short")
    .addAnswer("foto1", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/short1.jpg" })
    .addAnswer("foto2", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/short2.jpg" })
    .addAnswer("foto3", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/short3.jpg" })

const flujoPolera = addKeyword("polera")
    .addAnswer("foto1", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/polera1.jpg" })
    .addAnswer("foto2", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/polera2.jpg" })
    .addAnswer("foto3", { media: "C:/Proyectos/chatBot/base-baileys-memory/ropa/polera3.jpg" })

// const flujoDeProductos = addKeyword('producto')
//     .addAnswer('Consultando los productos disponibles...', null,
//         async (ctx, { flowDynamic }) => {
//             const respuesta = await axios('https://fakestoreapi.com/products')

//             for (const item of respuesta.data) {
//                 if (contador > 4) break;
//                 contador++
//                 flowDynamic({ body: item.title, media: item.image })
//             }
//         }
//     )
//     .addAnswer("escriba *producto* si quiere mostrarle mas articulos")

const path = require("path")

const flujoPrincipal = addKeyword(["Hola", "hola", "Buenas", "buenos"])
    .addAnswer("Bienvenido a mi pequeña tienda")
    .addAnswer(["Escriba *polo*, *pantalon*, *short*, *polera* para mostrarle alguno de nuestros elementos actuales en tienda",
        "o escriba *atencion* para contactar lo mas pronto con usted"],
        null,
        null,
        [flujoPolo, flujoPantalon, flujoShort, flujoPolera, flujoAtencionClien]
    )


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal,flujoPolo, flujoPantalon, flujoShort, flujoPolera])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
