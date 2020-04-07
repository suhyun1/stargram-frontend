import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation, useQuery } from "react-apollo-hooks";
import useInput from "../Hooks/useInput";
import { toast } from "react-toastify";
import Button from "../Components/Button";
import Input from "../Components/Input";
import Loader from "../Components/Loader";
import { useState } from "react";
import { ME } from "../SharedQueries";
import { useEffect } from "react";


const EDIT_USER = gql`
    mutation editUser(
        $username: String
        $email: String
        $firstName: String
        $lastName: String
        $bio: String
        $avatar: String
    ){  
        editUser(
            username: $username
            email: $email
            firstName: $firstName
            lastName: $lastName
            bio: $bio
            avatar: $avatar
        ){
            lastName
        }
    }
`;

const Wrapper = styled.div`
    min-height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Box = styled.div`
    ${props => props.theme.whiteBox};
    border-radius: 0px;
    width: 100%;
    max-width: 350px;
;`

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-botton: 15px;
  form {
    width: 100%;
    font-size: 14px;
    input {
      width: 100%;
      margin-top: 4px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      
    }
    button {
      width: 100%;
      margin-top: 10px;
    }
  }
`;



export default () => {
    const { data, loading } = useQuery(ME);

    const username = useInput("");
    const firstName = useInput("");
    const lastName = useInput("");
    const bio = useInput("");
    const email = useInput("");

    useEffect(() => {
      if (data && data.me) {
        username.setValue(data.me.username);
        firstName.setValue(data.me.firstName);
        lastName.setValue(data.me.lastName);
        bio.setValue(data.me.bio);
        email.setValue(data.me.email);
      }
    }, [data]);

    const [editUserMutation] = useMutation(EDIT_USER, {
      variables: {
        email: email.value,
        username: username.value,
        firstName: firstName.value,
        lastName: lastName.value,
        bio: bio.value

      },
    });


    const onSubmit = async e => {
        e.preventDefault();

        try {
          const {
            data: { editUser },
          } = await editUserMutation();
          console.log(editUser);
          if (!editUser) {
            toast.error("Can't change");
          } else {
            toast.success("Success!");
            setTimeout(() => { window.location = "/" }, 500);

          }
        } catch (e) {
          toast.error(e.message);
        }


    };

    if (loading) {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    } else if (!loading && data && data.me) {

      return (
        <Wrapper>
          <Form>
            <form onSubmit={onSubmit}>
              Username
              <Input
                value={data.me.username}
                required={true}
                {...username}
              />
              Email
              <Input
                value={data.me.email}
                required={true}
                {...email}
                type="email"
              />
              First Name
              <Input
                value={data.me.firstName}
                required={false}
                {...firstName}
              />
              Last Name{" "}
              <Input
                value={data.me.lastName}
                required={false}
                {...lastName}
              />
              Bio <Input value={data.me.bio} required={false} {...bio} />
              <Button text={"Complete"} />
            </form>
          </Form>
        </Wrapper>
      );
    }
    return null;

};  
