import React, { useState, useEffect } from 'react';
import { useUsers } from '../../hooks/useUsers';

interface FormData {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    packageId: string;
    parentId: string;
    position: 'left' | 'right';
    password: string;
    retypePassword: string;
}

interface Package {
    id: string | number;
    packageName: string;
    price: number;
}

const initialFormData: FormData = {
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    packageId: '',
    parentId: '',
    position: 'left',
    password: '',
    retypePassword: ''
};