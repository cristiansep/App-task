import { fetchConToken, fetchSinToken } from "../../helpers/fetch";


describe('Pruebas en fetch', () => {


    let token = '';


    test('fetchSinTocken debe funcionar de forma correcta', async() => {



        const resp = await fetchSinToken('auth', {email: 'test@gmail.com', password: '123456'}, 'POST');

        expect(resp instanceof Response).toBe(true);


        const body = await resp.json();
        expect(body.ok).toBe(true);
        
    });



    test('fetchConTocken debe funcionar de forma correcta', async() => {

        localStorage.setItem('token', token);

        const resp = await fetchConToken('tareas/5f388870303a2221d49843d3',{}, 'DELETE');
        const body = await resp.json();

        expect(body.message).toBe('No hay token en la petición');
        
    });


});