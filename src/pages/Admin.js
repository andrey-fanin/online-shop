import React, {useState} from 'react';
import {Container, Button} from 'react-bootstrap'
import CreateType from "../components/modals/CreateType";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)

    return (
        <Container className='d-flex flex-column' style={{maxWidth:250}}>
            <Button onClick={() => setTypeVisible(true)} variant={'outline-dark'} className='mt-4 p-2'>Add type</Button>
            <Button onClick={() => setBrandVisible(true)} variant={'outline-dark'} className='mt-4 p-2'>Add brand</Button>
            <Button onClick={() => setDeviceVisible(true)} variant={'outline-dark'} className='mt-4 p-2'>Add device</Button>
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)}/>
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)}/>
        </Container>
    );
};

export default Admin;