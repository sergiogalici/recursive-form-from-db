##### `Introduzione`

React Hook Form è una libreria che fornisce funzionalità per
la creazione di form complessi, annidati e che possono espandersi su più
componenti.
Con le sue 6 API permette di astrarrare molta della logica dai componenti
e fare in modo che questi siano più incentrati sul render della view
piuttosto che essere carichi di logica di business.
Inoltre, la gestione dello stato del form da parte del browser, evita
render superflui e migliora la performance.

##### `Utilizzo`

​
React Hook Form utilizza il concetto di "uncontrolled components", ovvero componenti di form il cui valore è gestito direttamente dal browser, senza utilizzare lo stato di React. Ciò significa che non è necessario aggiornare lo stato del form ogni volta che l'utente modifica un campo di input.
​
Per utilizzare React Hook Form, è sufficiente importare l'hook useForm e invocarlo nel componente di form:

**_ esempio _**
​
import { useForm } from 'react-hook-form';
​
function MyForm() {
const { register, handleSubmit } = useForm();
​
const onSubmit = (data) => {
console.log(data);
}
​
return (
​

<form onSubmit={handleSubmit(onSubmit)}>
<input name="firstName" ref={register} />
<input name="lastName" ref={register} />
<button type="submit">Submit</button>
</form>
);
}
​
In questo esempio, register viene utilizzato per registrare gli input del form, mentre handleSubmit viene utilizzato per gestire l'invio del form. L'oggetto data passato alla funzione onSubmit contiene i valori dei campi di input registrati.
​

###### `Note personali`

Una cosa da notare, tra le tante, è che il sistema di validazione offerto da React Hook Form presenta molte lacune e tanti aspetti che non sarebbe possibile gestire altrimenti in runtime.
Utilizzare una libreria di validazione come yup ed utilizzare il resolver di yup come resolver per RHF, è sicuramente una strategia migliore, poiché permette di aggiungere
funzionalità altrimenti non presenti all'interno della libreria, come la possbilità di validare un campo email solamente quando presenta una struttura valida.
La libreria yup inoltre permette, attraverso la sua api, di inserire una validazione custom attraverso il parametro "test" dell'oggetto yup.
Ad esempio, se vogliamo che una mail valida debba finire soltanto con ".com", possiamo scrivere:

**_ esempio _**

email: yup.string().email().test('is-valid-email', 'L\'email deve essere valida', (value) => {
return value.endsWith('@gmail.com');
})

In questo modo sarà possibile avere qualsiasi tipo di validazione, anche per gli input e le select con i campi più inaspettati.
Una possibilità potrebbe essere quella di validare il campo del comune di residenza a partire da una lista di comuni di un determinato stato ottenuti dai dati forniti da un'API.

Un altro esempio ancora, potrebbe essere il caso in cui abbiamo un oggetto e almeno uno dei suoi valori deve essere vero.

**_esempio_**

const edLevelsSchema = yup
  .object()
  .shape({
    earlyEducation: yup.boolean(),
    elementarySchool: yup.boolean(),
    middleSchool: yup.boolean(),
    highSchool: yup.boolean(),
    college: yup.boolean(),
    graduateSchool: yup.boolean(),
    phd: yup.boolean(),
  })
  .test({
    test: (values) => {
      return Object.values(values ?? [false]).some((val) => val === true);
    },
    message: "At least one educational level must be selected",
  });
