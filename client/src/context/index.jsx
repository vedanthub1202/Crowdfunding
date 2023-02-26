import React , {useContext, createContext} from 'react';

import {useAddress, useContract, useMetamask, useContractWrite} from '@thirdweb-dev/react';
import {ethers} from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const {contract} = useContract('0xB4354E9aF106c30C2cee7e63990004774696121d');
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try{const data = await createCampaign([
            address, 
            form.title, 
            form.description,
            form.target, 
            new Date(form.deadline).getTime(),
            form.image
        ])
    console.log('contract call success', data);
    }
        catch(error){
            console.log('contract call failure', error);
        }
    }

    return <StateContextProvider
    value={{address, 
    contract, 
    createCampaign: publishCampaign,
    }}>
        {children}
    </StateContextProvider>;
}

export const useStateContext = () => useContext(StateContext);