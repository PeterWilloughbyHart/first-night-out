import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './categories.css'

const Categories = () => {


    return (
        <div className='CategoriesCont'>
            <div className='categoriesWrapper'>
                <Link to='/food'><div title='Food' className='foodPic'/>
                    <span className='foodLabel'>Food</span></Link>
                <Link to='/family-fun'><div title='Family Fun' className='familyFunPic'/>
                    <span className='ffLabel'>Family Fun</span></Link>
                <Link to='/shopping'><div title='Shopping' className='shopping'/>
                    <span className='sLabel'>Shopping</span></Link>
                <Link to='/spa'><div title='Spa' className='spaPic'/>
                    <span className='spaLabel'>Spa</span></Link>
                <Link to='/night-life'><div title='Night Life' className='nightLifePic'/>
                    <span className='nlLabel'>Night Life</span></Link>
                <Link to='/entertainment'><div title='Entertainment' className='ePic'/>
                    <span className='eLabel'>Entertainment</span></Link>
            </div>
        </div>
    )
}


const mapStateToProps = state => state

export default connect(mapStateToProps)(Categories)