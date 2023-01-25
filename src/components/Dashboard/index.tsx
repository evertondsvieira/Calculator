import Input from "../Input"
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import './style.css'
import Api from "../../services/Api";
import { useState } from "react";
import { ISubmitForm } from "../../types";

const [result, setResult] = useState<ISubmitForm>([] as ISubmitForm);

function onSubmit(data:ISubmitForm){
    Api.post("/", data) 
    .then((response) => {
        setResult(response.data);
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    }) 
}

const Dashboard = () => {
    const schema = yup.object({
        amount: yup.string().required("O valor é obrigatório"),
        installments: yup.number().required("O número de parcelas é obrigatório").min(1, 'O mínimo de parcelas é 1').max(12,'O máximo de parcelas é 12'),
        mdr: yup.string().required("O percentual é obrigatório"),
    })
    
    const { register, handleSubmit, formState: { errors } } = useForm<ISubmitForm>({
        resolver: yupResolver(schema)
    })

    return(
        <div>
            <div className="dashboard-centralize" onSubmit={handleSubmit(onSubmit)}>
                <form className="dashboard-form">
                    <h1 className="title">Simule sua Antecipação</h1>
                    <Input htmlFor="amount" label="Informe o valor da venda *" name="amount" type="text" register={register}/>
                    <div className="yup-notification"><p>{errors.amount?.message}</p></div> 
                    <Input htmlFor="installments" label="Em quantas parcelas *" name="installments" type="text" register={register}/>
                    <div className="yup-notification"><p>{errors.installments?.message}</p></div> 
                    <Input htmlFor="mdr" label="Informe o percentual de MDR" name="mdr" type="text" register={register}/>
                    <div className="yup-notification"><p>{errors.mdr?.message}</p></div>
                    <button type="submit" className="submit-button">Enviar</button>
                </form>
            </div>

            <div className='result-centralize'>
                <h1 className='result-title'>Você receberá</h1>
                {result.length === 0 ? (
                    <ul className='result-ul'>
                        <li className='result-li'>Amanhã: 0,00</li>
                        <li className='result-li'>Em 15 dias: 0,00</li>
                        <li className='result-li'>Em 30 dias: 0,00</li>
                        <li className='result-li'>Em 90 dias: 0,00</li>
                    </ul>
                ) : (
                    <ul className='result-ul'>
                        <li className='result-li'>Amanhã:{result[1]}</li>
                        <li className='result-li'>Em 15 dias:{result[15]}</li>
                        <li className='result-li'>Em 30 dias:{result[30]}</li>
                        <li className='result-li'>Em 90 dias:{result[90]}</li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Dashboard;