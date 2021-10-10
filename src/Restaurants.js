import { useLocation,useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import queryString from 'query-string'
import {Table,Card,Container,Pagination} from 'react-bootstrap'

export default function Restaurants(){
    const [restaurants,setRestaurants] = useState(null);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    let location = useLocation();
    let history = useHistory();
    useEffect(()=>{
        setLoading(true);
        let searchResult = queryString.parse(location.search).borough;
        let fetchString = "";
        if(searchResult)fetchString =`&borough=${searchResult}`;
        fetch(`https://polar-plains-45166.herokuapp.com/api/restaurants?page=${page}&perPage=10${fetchString}`)
        .then(res=>res.json())
        .then(data=>setRestaurants(data))
        .catch(err=>console.log(err))
        .finally(()=>setLoading(false))
        },[location,page]);
        
    function previousPage(){
        if(page>1)
        setPage(page-1);
     }
    
     function nextPage(){
        setPage(page+1);
     }
    

    if(!restaurants){
        if(loading){
            return(
                <Card>
                <Card.Header>
                    <p>Loading Restaurants...</p>
                </Card.Header>
            </Card>
            )
        }else{
            return(
                <Card>
                <Card.Header>
                    <p>No Restaurants Found</p>
                </Card.Header>
            </Card>
            )
        }
    }

    return(
        <Container>
            <Card>
                <Card.Header>
                    <h4>Restaurant List</h4>
                    <p>Full list of restaurant. Optionally sorted by borough</p>
                </Card.Header>
            </Card>
            <br />
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Borough</th>
                        <th>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                {
                    restaurants.map(restaurant=>
                        <tr key={restaurant._id} onClick={()=>{history.push(`/restaurant/${restaurant._id}`)}}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.address.building} {restaurant.address.street}</td>
                            <td>{restaurant.borough}</td>
                            <td>{restaurant.cuisine}</td>
                        </tr>
                        )
                }
                </tbody>
            </Table>
           
            <Pagination>
                <Pagination.Prev onClick={previousPage}/>
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage}/>
            </Pagination>
        </Container>
    )
}
 
