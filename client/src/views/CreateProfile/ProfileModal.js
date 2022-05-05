import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ManageProfile from './ManageProfile';

export default function ProfileModal ({
    modal,
    setModal,
    createNew, 
    selectedProfile,
    setProfiles
}) {

    const toggle = () => setModal(!modal);

    return (
        <Modal isOpen={modal} toggle={toggle} size={'lg'}>
            <ModalBody>
                <ManageProfile 
                    createNew={createNew}
                    selectedProfile={selectedProfile}
                    toggle={toggle}
                    setProfiles={setProfiles}
                />
            </ModalBody>
        </Modal>
    );
}