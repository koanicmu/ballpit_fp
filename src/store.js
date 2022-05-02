import create from 'zustand'
import shallow from 'zustand/shallow'

const startingPosition = [0, 3, 2]


export const useStoreImpl = create(set => ({ 
    position: startingPosition,
    boosting: false,
    actions: {
        reset:  ()=>{
            set((state) => {
                state.api?.position.set(...startingPosition);
                state.velocity.current[1] = 0;
              })
        },
        boost: (boosting)=>{
            set((state)=>{
                state.boosting = boosting
            })
        }
    }
}))

const useStore = (stateSelector)=> useStoreImpl(stateSelector, shallow)
const {getState, setState} = useStoreImpl;

export {getState, setState, useStore}






 