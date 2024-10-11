import{r,j as e,a as b,b as a}from"./app-BXrArFBs.js";import{S as w}from"./slick-theme-C77tt4eq.js";import{A as L}from"./AuthenticatedLayout-D4UnI0sw.js";import"./index-DNIGxXKG.js";import"./ApplicationLogo-BsryiP8T.js";import"./transition-Di5nBCVh.js";import"./index-NDvWyOIA.js";const q=({auth:d,formDataFromCitySearch:t})=>{const[i,l]=r.useState({originLocationCode:(t==null?void 0:t.originLocationCode)||"",originLocationName:(t==null?void 0:t.originLocationName)||"",destinationLocationCode:(t==null?void 0:t.destinationLocationCode)||"",destinationLocationName:(t==null?void 0:t.destinationLocationName)||"",departureDate:"",adults:""}),[c,u]=r.useState([]),[p,x]=r.useState(!1),s=o=>{const{name:n,value:m}=o.target;l({...i,[n]:m})},h=async o=>{o.preventDefault();try{const n=await a.post("/api/search",i);u(n.data.data)}catch(n){console.error("Errore durante la ricerca del volo:",n)}},g=async o=>{try{if(!o.price)throw new Error("Il prezzo del volo non è definito");const n=await a.post("/api/book-flight",{flight_id:o.id,carrier_code:o.itineraries[0].segments[0].carrierCode,duration:o.itineraries[0].duration,total_price:o.price.total,booking_deadline:o.lastTicketingDate,bookable_seats:o.numberOfBookableSeats,instant_ticketing_required:o.instantTicketingRequired,direct_flight:o.oneWay,origin_city_name:i.originLocationName,origin_city_code:i.originLocationCode,destination_city_name:i.destinationLocationName,destination_city_code:i.destinationLocationCode});console.log(n.data.message),x(!0)}catch(n){console.error("Errore durante la prenotazione del volo:",n)}},j={dots:!1,infinite:!0,speed:500,slidesToShow:3,slidesToScroll:1};return e.jsxs(L,{user:d.user,children:[e.jsx(b,{title:"Flight Search"}),e.jsxs("div",{className:"form-container",style:{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[e.jsxs("form",{onSubmit:h,style:{width:"50%",textAlign:"center"},children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"originLocationCode",style:{color:"white"},children:"Città di partenza:"}),e.jsx("input",{type:"text",id:"originLocationCode",name:"originLocationCode",value:`${i.originLocationName} (${i.originLocationCode})`,onChange:s,required:!0,style:{width:"100%"}})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"destinationLocationCode",style:{color:"white"},children:"Città di destinazione:"}),e.jsx("input",{type:"text",id:"destinationLocationCode",name:"destinationLocationCode",value:`${i.destinationLocationName} (${i.destinationLocationCode})`,onChange:s,required:!0,style:{width:"100%"}})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"departureDate",style:{color:"white"},children:"Data di partenza:"}),e.jsx("input",{type:"date",id:"departureDate",name:"departureDate",value:i.departureDate,onChange:s,required:!0,style:{width:"100%"}})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{htmlFor:"adults",style:{color:"white"},children:"Numero di adulti:"}),e.jsx("input",{type:"number",id:"adults",name:"adults",value:i.adults,onChange:s,required:!0,style:{width:"100%"}})]}),e.jsx("button",{type:"submit",style:{width:"100%",backgroundColor:"#4CAF50",color:"white",padding:"14px 20px",margin:"8px 0",border:"none",borderRadius:"4px",cursor:"pointer",transition:"background-color 0.3s"},children:"Cerca volo"})]}),p&&e.jsx("div",{style:{color:"green",fontSize:"1.5em",marginTop:"20px"},children:"Prenotazione effettuata con successo!"}),e.jsx("div",{className:"slider-container",children:e.jsx(w,{...j,children:c.map(o=>e.jsxs("div",{className:"flight-card",children:[e.jsxs("h3",{style:{color:"white"},children:["Volo ",o.id]}),e.jsxs("p",{style:{color:"white"},children:["Compagnia aerea: ",o.itineraries[0].segments[0].carrierCode]}),e.jsxs("p",{style:{color:"white"},children:["Città di partenza: ",i.originLocationName," (",i.originLocationCode,")"]}),e.jsxs("p",{style:{color:"white"},children:["Città di destinazione: ",i.destinationLocationName," (",i.destinationLocationCode,")"]}),e.jsxs("p",{style:{color:"white"},children:["Durata: ",o.itineraries[0].duration]}),e.jsxs("p",{style:{color:"white"},children:["Prezzo totale: ",o.price&&o.price.total," ",o.price&&o.price.currency]}),e.jsxs("p",{style:{color:"white"},children:["Data ultima prenotazione: ",o.lastTicketingDate]}),e.jsxs("p",{style:{color:"white"},children:["Posti prenotabili: ",o.numberOfBookableSeats]}),e.jsxs("p",{style:{color:"white"},children:["Ticket immediato richiesto: ",o.instantTicketingRequired?"Sì":"No"]}),e.jsxs("p",{style:{color:"white"},children:["Volo diretto: ",o.oneWay?"Sì":"No"]}),e.jsx("button",{onClick:()=>g(o),style:{backgroundColor:"#4CAF50",color:"white",padding:"8px 16px",margin:"8px 0",border:"none",borderRadius:"4px",cursor:"pointer"},children:"Prenota questo volo"})]},o.id))})})]}),e.jsx("style",{jsx:!0,children:`
                .slider-container {
                    width: 80%;
                    margin: 20px auto;
                }

                .flight-card {
                    background-color: #333;
                    padding: 20px;
                    margin: 0 10px;
                    border-radius: 5px;
                }

                .flight-card h3,
                .flight-card p {
                    margin: 5px 0;
                }
            `})]})};export{q as default};
