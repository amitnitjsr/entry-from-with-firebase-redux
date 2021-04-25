import * as types from './ActionTypes';

export const updateRedux = (data) => {
    const updatedData = data;
    return (dispatch, getState) => {
        return dispatch({ type: types.UPDATE_ENTRY, payload: updatedData });
    }
}

export const addNewEntry = (data) => {
    const { name, email, phone, customer_id, gender } = data;
    return (dispatch, getState) => {
        const { list } = getState().entry;
        const lastData = list[list.length - 1];
        const newData = [
            ...list,
            {
                'id': lastData.id + 1,
                'name': name || '',
                'email': email || '',
                'phone': phone || '',
                'customer_id': customer_id || '',
                'gender': gender || '',
            }
        ]
        return dispatch({ type: types.CREATE_NEW_ENTRY, payload: newData });
    }
}


export const deleteEntry = (data) => {
    const { id } = data;
    return (dispatch, getState) => {
        const { list } = getState().entry;
        function filterObj(keys, obj) {
            const newObj = {};
            for (let key in obj) {
                if (!keys.includes(key)) {
                    newObj[key] = obj[key];
                }
            }
            return newObj;
        }
        const newData = filterObj(id, list);
        return dispatch({ type: types.DELETE_ENTRY, payload: newData });
    }
}

export const editEntry = (data) => {
    const {
        start_of_services,
        end_of_services,
        procedure_code,
        quantity,
        place_of_services,
        dp1,
        dp2,
        dp3,
        dp4,
        md1,
        md2,
        md3,
        md4,
        ndc_code,
        ndc_quantity,
        bill_amount,
        provider_email_address,
        provider_phone,
        id
    } = data;

    return (dispatch, getState) => {
        const { list } = getState().entry;
        Object.keys(list).map((valId) => {
            if (valId === id) {
                list[valId].start_of_services = start_of_services;
                list[valId].end_of_services = end_of_services;
                list[valId].procedure_code = procedure_code;
                list[valId].quantity = quantity;
                list[valId].place_of_services = place_of_services;
                list[valId].dp1 = dp1;
                list[valId].dp2 = dp2;
                list[valId].dp3 = dp3;
                list[valId].dp4 = dp4;
                list[valId].md1 = md1;
                list[valId].md2 = md2;
                list[valId].md3 = md3;
                list[valId].md4 = md4;
                list[valId].ndc_code = ndc_code;
                list[valId].ndc_quantity = ndc_quantity;
                list[valId].bill_amount = bill_amount;
                list[valId].provider_email_address = provider_email_address;
                list[valId].provider_phone = provider_phone;
            }
            return null;
        })
        return dispatch({ type: types.EDIT_ENTRY, payload: list });
    }
}
