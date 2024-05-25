import React from 'react'
import './CrudTool.css'
import { Flex, DropdownMenu, Button } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { FiMoreVertical } from "react-icons/fi";
import EditTool from './EditTool';

const CrudTool = ({ onDelete, toolCode, toolName, toolQuantity }) => {
    const handleDeleteClick = () => {
        onDelete && onDelete(); 
    };

    return (
        <Flex gap="3" align="center">
            <DropdownMenu.Root >
                <DropdownMenu.Trigger >
                    <Button variant="soft" color='gray'>
                        <FiMoreVertical />
                        
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content variant="solid">
                    <EditTool toolCode={toolCode} toolName={toolName} toolQuantity={toolQuantity} />                    
                    <DropdownMenu.Separator />

                    <DropdownMenu.Item shortcut=" ⌫" color="red" onClick={handleDeleteClick}>
                        Excluir
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    )
}

export default CrudTool