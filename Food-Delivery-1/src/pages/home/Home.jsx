import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {
    const [category,setCategory] = useState("All");
  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}  />
        <FoodDisplay category={category} />
        <AppDownload />
    </div>
  )
}

export default Home

// destructure ExploreMenu using usestate as category and set category 
// Why only category?
// Because FoodDisplay only needs to read the current category to filter the food items.
//Where is setCategory used?
//setCategory is usually used in the component where the user clicks to change the category, such as ExploreMenu.