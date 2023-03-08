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

`Uncontrolled components`

Uno dei punti di forza della libreria RFH è sicuramente l'utlizzo di componenti non controllati e slegati dallo stato, che permettono di aggiornare lo stato (anche collegato a redux) senza a dover fare render superflui.
Le API di RHF sono principalmente sei:useForm, useController, useFormContext, useWatch e useFormState.

`useFieldArray hook`

useFieldArray dell'API useFrom di RHF è un potente strumento che permette di "guardare" lo stato di campi del form che sono pensati come un'insieme di elementi (si pensi al campo "figli", dove ognuno di loro porta con sé un sotto-form annidato uguale per ognuno di loro).
Questo ci permette di renderizzare nuovi formi all'aggiunta di un campo in queste liste e di andare a manipolare dinamicamente lo stato di queste a partire da un indice.

`getFieldState hook`

L'API di RHF ci permette inoltre di de-strutturare lo stato di form complessi e annidati in più livelli di profondità attraverso l'hook getFieldState, comodo quando, nella parte opposta di un form, abbiamo nuovamente bisogno di un valore presente in un sotto-form annidato altrove.

`useController API`

L'API useController ci permette di lavorare con select ed input non-nativi, come quelle di MUI, AntDesign e React-Select. Component ci offre un componente che andrà ad avvolgere quello della libreria che stiamo usando per iniettare i valori corretti nel momento in cui verrà idratato. E' da notare che il funzionamento di questa API non è perfetto ed è poco intuitivo, finendo spesso ad aggiungere più complessità di quella che dovrebbe essere invece astratta dallo sviluppatore.

`useFormContext API`

Una delle API sicuramente meglio riuscite è l'useFormContext che, come è semplice intuire, fornisce un contesto dove avvolgere il nostro form complesso per iniettare in quest'ultimo i valori che dovrà andare a portare alla view.
Questa funzionalità non viene comunque senza un prezzo, che è quello della sua complessità: sono numerosi i valori da dover tenere d'occhio durante l'iniezione dello stato del form, circa una ventina stando alla documentazione ufficiale.
Questo tuttavia ci fornisce grande controllo sul form che andremo ad avviluppare nel contesto, come la possibilità di controllare quante volte un contenuto è stato sottoposto, se il form (o uno o più dei suoi sottoform) si stanno attualmente caricando, se il processo di validazione è attualmente in atto o lo stato della validazione al momento del suo termine e altro ancora, come concetti interni alla libreria come quello della "sporcizia" (dirtiness) e "tocco" (touched).

`yup validation`

Una cosa da notare, tra le tante, è che il sistema di validazione offerto da React Hook Form presenta molte lacune e tanti aspetti che non sarebbe possibile gestire altrimenti in runtime.
Utilizzare una libreria di validazione come yup ed utilizzare il resolver di yup come resolver per RHF, è sicuramente una strategia migliore, poiché permette di aggiungere
funzionalità altrimenti non presenti all'interno della libreria, come la possbilità di validare un campo email solamente quando presenta una struttura valida.
La libreria yup inoltre permette, attraverso la sua api, di inserire una validazione custom attraverso il parametro "test" dell'oggetto yup.
Ad esempio, se vogliamo che una mail valida debba finire soltanto con ".com", possiamo scrivere:

**_esempio_**

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

L'API useForm di RHF offre una funzione setError che dovrebbe avere lo scopo di creare gli errori custom, ma le sue potenzialità sono sensibilmente inferiori rispetto a quelle di yup.
In definitiva, l'utilizzo di RHF in tandem con yup permette l'implementazione di validazioni complesse anche per i casi più specifici.
