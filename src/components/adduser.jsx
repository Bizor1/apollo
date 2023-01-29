import { gql, useMutation } from "@apollo/client"


const ADD_USER_MUTATION=gql`
mutation($email:String!,$username:String!,$password1:String!,$password2:String!) {
    register(
      email: $email,
      username: $username,
      password1: $password1,
      password2: $password2,
    ) {
      success,
      errors,
      token,
      refreshToken
    }
  }
`


export default function Register (){

    const [register,{data}]=useMutation(ADD_USER_MUTATION)


    function handleSubmit(event){
        event.preventDefault();
        const form=event.target
        const email=form.elements.email.value
        const username=form.elements.username.value
        const password2=form.elements.password2.value
        const password1=form.elements.password1.value


        register({variables:{email,username,password1,password2}})





    };
    console.log(data)




    return(
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="emal"/>
            <input name="username" placeholder="username"/>
            <input name="password1" placeholder="password1"/>
            <input name="password2"placeholder="password2"/>

            <button type="submit">Rgisters</button>

        </form>
    )


}
