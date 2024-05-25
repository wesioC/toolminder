import React, { useState } from 'react';
import './CrudTool.css';
import { Flex, DropdownMenu, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { FiMoreVertical } from "react-icons/fi";
import EditTool from './EditTool';

const CrudTool = ({ onDelete, toolCode, toolName, toolQuantity }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDeleteClick = () => {
        setShowConfirmation(true);
    };

    const confirmDelete = () => {
        setShowConfirmation(false);
        onDelete && onDelete();
        showNotification('Ferramenta excluída com sucesso!', 'success');
    };

    const cancelDelete = () => {
        setShowConfirmation(false);
    };

    const showNotification = (message, type) => {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerText = message;

        document.body.appendChild(notification);

        // Show the notification
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    };

    return (
        <Flex gap="3" align="center">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="soft" color='gray'>
                        <FiMoreVertical />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="solid">
                    <EditTool toolCode={toolCode} toolName={toolName} toolQuantity={toolQuantity} />
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌫" color="red" onClick={handleDeleteClick}>
                        Excluir
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>

            {showConfirmation && (
                <div className="confirmation-dialog">
                    <div className="message">Tem certeza que deseja excluir?</div>
                    <div className="buttons">
                        <Button color="red" onClick={confirmDelete}>Excluir</Button>
                        <Button onClick={cancelDelete}>Cancelar</Button>
                    </div>
                </div>
            )}
        </Flex>
    );
}

export default CrudTool;
