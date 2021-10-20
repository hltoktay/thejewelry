import React, { useState, useEffect } from 'react';
import filterSearch from '../utils/filterSearch';
import { getData } from '../utils/fetchData';
import { useRouter } from 'next/router'


export default function Filter({state}) {

    const [ title, setTitle ] = useState('')
    const [ search, setSearch ] = useState('')
    const [ sort, setSort ] = useState('')
    const [ category, setCategory ] = useState('')

    const {categories} = state;
    const router = useRouter()

    const handleCategory = (e) => {
        setCategory(e.target.value)
        filterSearch({ router, category: e.target.value})
    }

    const handleSort = (e) => {
        setSort(e.target.value)
        filterSearch({router, sort: e.target.value})
    }

    useEffect((e) => {
        filterSearch({router, search: search ? search.toLowerCase() : 'all'})
        
    }, [search])

    const changeBtnTxt = (e) => {

    }

    return (

<section className="search-sec" style={{ margin: 'auto',}}>
    <div className="container">
    
        <form action="#" method="post" noValidate="novalidate">
            <div className="row">
                <div className="col-lg-12 col-sm-12">
                    <div className="row">
                        <div className="col-lg-3 col-md-2 col-sm-12 p-0">
                            <select className="form-control search-slt" 
                            value={category} onChange={handleCategory}>
                             
                             <option value="all">All Products</option>
                                {
                                    categories.map(item => (
                                        <option key={item._id} value={item._id}>{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="col-lg-6 col-md-5 col-sm-12 p-0">
                            <input type="text" className="form-control search-slt" list="title_product"
                                value={search.toLowerCase()}  onChange={e => setSearch(e.target.value)} />


                        </div>
                        <div className="col-lg-3 col-md-2 col-sm-12 p-0">
                            <select className="form-control search-slt" value={sort} onChange={handleSort}>
                                <option value="-createdAt">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="-sold">Best Sales</option>
                                <option value="-price">Price: High-Low</option>
                                <option value="price">Price: Low-High</option>
                            </select>
                        </div>
                        {/* <div className="col-lg-2 col-md-2 col-sm-12 p-0">
                            <button type="submit" className="btn wrn-btn">Search</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </form>
         {/* <button class="btn btn-hide text-uppercase"
                type="button" data-toggle="collapse" data-target="#filterbar" aria-expanded="false" aria-controls="filterbar"
                id="filter-btn" onClick={changeBtnTxt}> <span class="fas fa-angle-left" id="filter-angle"></span>
                <span id="btn-txt">Hide filters</span> 
            </button> */}
    </div>
</section>
    )
}
