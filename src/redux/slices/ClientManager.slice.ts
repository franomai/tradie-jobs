import { createSlice } from '@reduxjs/toolkit';
import Client from '../../types/Client';
import { StoreState } from '../Store';

export interface State {
    clients: Record<string, Client>;
}

export const initialState: State = {
    clients: {},
};

const clientManagerSlice = createSlice({
    name: 'clientManager',
    initialState,
    reducers: {
        addAllClients(state, action: { payload: Client[] }) {
            action.payload.forEach((client) => {
                state.clients[client.id] = client;
            });
        },
    },
});

export const { addAllClients } = clientManagerSlice.actions;

export const getAllClients = (state: StoreState) => state.clientManager.clients;

export default clientManagerSlice.reducer;
