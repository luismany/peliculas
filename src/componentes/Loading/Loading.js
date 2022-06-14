import { Spin } from "antd";

import './Loading.scss';

export default function Loading() {
    
    return (
        <div className="loading">
            <Spin size="large" />
            <h4>Cargando</h4>
        </div>
        

    );
}