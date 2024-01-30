"use client"
import { useState } from 'react';
import Image from 'next/image';
export default function dashboard() {
    const token = localStorage.getItem('token')||window.localStorage.getItem('token');
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{token}</h2>
        </div>
    )
}