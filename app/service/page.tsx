"use client"
import React from 'react'
import MainService from "./componets/MainService"
import Footer from "../componetsMain/footer"
import Navbar from "../componetsMain/navbar"

const ServicePage = () => {
    return (
        <div className="relative min-h-screen bg-slate-50">
            <Navbar />
            
            <main className="relative z-10">
                <MainService />
            </main>
            
            <Footer />
        </div>
    )
}

export default ServicePage