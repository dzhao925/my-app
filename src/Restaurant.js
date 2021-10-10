import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';

export default function Restaurant(){
    const [restaurant,setRestaurant] = useState(null);
    const [loading,setLoading] = useState(false);

    let {id} = useParams();

    useEffect(()=>{
        setLoading(true);
        fetch(`https://polar-plains-45166.herokuapp.com/api/restaurants/${id}`)
        .then(res=>res.json())
        .then(data=>{
            if(data._id){
                setRestaurant(data);
            }else{
                setRestaurant(null);
            }
        })
        .catch(err=>console.log(err))
        .finally(setLoading(false));
    },[id])



    if(!restaurant){
        if(loading){
            return(
                <Card>
                <Card.Header>
                    <p>Loading Restaurant Data...</p>
                </Card.Header>
            </Card>
            )
        }else{
            return(
                <Card>
                <Card.Header>
                    <p>Unable to find Restaurant with id: {id}</p>
                </Card.Header>
            </Card>
            )
        }
    }

    return(
        <Container>
        <Card >
            <Card.Header>
                <h4>{restaurant.name}</h4>
                <p>{restaurant.address.building} {restaurant.address.street}</p>
            </Card.Header> 
         </Card>
         <br />
        <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
        </MapContainer>
        <br />
        <CardDeck>
            {restaurant.grades.map(element=>
                <Card key={element._id}> 
                    <Card.Header>
                    <Card.Text>Grade: {element.grade}</Card.Text>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>Completed: {new Date(element.date).toLocaleDateString()}</Card.Text>
                    </Card.Body>
                </Card>)}
        </CardDeck>
        </Container>
    )
}