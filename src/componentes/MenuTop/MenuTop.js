import React from "react";
import { Link } from "react-router-dom";
import {Menu}   from "antd";
import { ReactComponent as Logo } from '../../asets/img/logo.svg';

import  './MenuTop.scss'

export default function MenuTop() {
    
    return (
        <div className="menu-top">
            <div className="menu-top__logo">
                <Logo />
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["1"]}
                style={{lineHeight:"64px"}}
            >
                <Menu.Item key="1">
                    <Link to="/peliculas">Home</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/new-movies">Nuevos Lanzamientos</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/popular">Populares</Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/search">Buscador</Link>
                </Menu.Item>
            </Menu>
        </div>
    );
}