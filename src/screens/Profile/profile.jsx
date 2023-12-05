import React, { useState, useEffect, useRef } from 'react';
import { FireError } from '../../utils/alertHandler';

import Title from "../../components/Title/Title";
import Icons from "../../icons/index";
import ListItem from "../../components/ListItem/ListItem";

import styles from "./profile.module.css";

export default function profile (){

  return (
    <div>      
      <Title>
        Mi perfil
      </Title>
    </div>
  )

}