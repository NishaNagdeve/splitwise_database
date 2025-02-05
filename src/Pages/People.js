import React,{useEffect} from 'react'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import photo from '../Images/ptt.jpg';
import LinkIcon from '@mui/icons-material/Link';
import { Button ,Row,Col,Container,Navbar,Modal} from 'react-bootstrap';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Link, useLocation } from 'react-router-dom';
import split from "../Images/splitwise-icon.png";
import Footer from '../Components/Footer';
import { useState } from 'react';
import Add from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
import img1 from '../Images/img1.jpg';
import img2 from '../Images/img2.jpg';
import img3 from '../Images/img3.jpg';
import DescriptionIcon from '@mui/icons-material/Description';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import '../Styles/People.css';
import grey from '../Images/grey.png';
import DoneIcon from '@mui/icons-material/Done';
import grey2 from '../Images/grey2.jpg';
function People() {

    // const img=localStorage.getItem("groupImg");
    // const name=localStorage.getItem("groupName");
    const baseUrl="https://splitwise-database.onrender.com";
    const location=useLocation();
    const {groupName,groupImg,id,num,expenses,shares,draft}=location.state || {};
     const img=groupImg;
     const name=groupName;
     const groupId=id;
     console.log(expenses);
    

     const[fetch,setFetch]=useState({ description: '', paidBy: '', splitBy: '' });
     const[flow,setFlow]=useState([]);
     const[detail,setDetails]=useState(false);
    const [model,setModel]=useState(false);
    const [user,setUser]=useState("");
    const [email,setEmail]=useState("");
    const [mobile,setMobile]=useState("");
    const [member,setMember]=useState([]);
    const [check,setCheck]=useState();
    const [users,setUsers]=useState([]);
    const [models,setModels]=useState(false);
    const [desc,setDesc]=useState("");
    const [amt,setAmt]=useState(0);
    const [paidby,setPaidby]=useState("");
    const [splitby,setSplitby]=useState("");
    const [owed, setOwed]=useState([]);
    const [paid,setPaid]=useState([]);
    const[data,setData]=useState([]);
    const[overallbal,setOverallbal]=useState(false);
    const [addMoney,setAddMoney]=useState([{
       user:'',
       money:0
    }])
   
    const [sub,setSub]=useState('');
    const[exp,setExp]=useState([]);
    useEffect(() => {
      if (expenses && Array.isArray(expenses)) {
        setData(expenses); // Initialize `data` with `expenses`
    
        // Process shares
        const owe = shares.map((sh) => sh.owed);
        const pay = draft.map((p) => p.paid);
        console.log(typeof(owe));
        // Process dates for each expense
        const updatedExpenses = expenses.map((exp) => {
          const createdDate = new Date(exp.createdAt); // Convert each `createdAt` to a date object
          // if (isNaN(createdDate)) return { ...exp, year: null, month: null, day: null }; // Handle invalid dates
          console.log(createdDate);
          const year = createdDate.getFullYear();
          const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(createdDate);
          const day = createdDate.getDate();
          
    
          return {
            ...exp,
            year,
            month,
            day,
            owes: owe, 
            pays: pay,
          };
        });
    
        // Update state with enriched data
        setData(updatedExpenses);
      }
    }, [expenses, shares]);

    const handleClose=()=>
    {
        setModel(false);
        setModels(false);
        setSettle(false);
        setTotal(false);
        setOverallbal(false);
    }
    const handleshow=()=>{
        
        setModel(true);
    }
    const handleChange=(e)=>
    {
        if(e.target.name==="user")
        {
          const user=e.target.value;
          setUser(user);
        }
        else if(e.target.name==="emailId")
        {
           const emailId=e.target.value;
           setEmail(emailId);
        }
        else if(e.target.name==="Number")
        {
          const number=e.target.value;
          setMobile(number);
        } 
        else if(e.target.name==="desc")
        {
          const desc=e.target.value;
          setDesc(desc);
        }
        else if(e.target.name==="amount")
        {
            setAmt(e.target.value);
        }
        else if(e.target.name==="paidBy")
        {
           setPaidby(e.target.value);
        }
        else if(e.target.name==="splitBy")
        {
           setSplitby(e.target.value);
           if(e.target.value==="Unequally" || e.target.value==="Percentage")
           {
            const newUser = "you"; 
            const updatedUsers = [...users, newUser]; 
            setUsers(updatedUsers);
           }
        }

    }
    
    const mainUser=localStorage.getItem("email");
    const handleMember=async ()=>
    {
        const newmember={user:user,email:email,mobile:mobile};
        console.log(user);
        setMember([...member,newmember]);
        handleClose();
       try{  
        const res=await axios.post(`${baseUrl}/member`,{
           mainUser,
           groupId,
           user,
           email,
           mobile
        })
        alert(res.data); 
      }
      catch(error)
      {
        console.error(error);
      }
      try{
        const res=await axios.post(`${baseUrl}/id?groupId=${groupId}`);
        // console.log("before:",res.data);
        if((res.data)===0)
        {
             setCheck(0);
        }
        else
        {
          setCheck(res.data);
        }
       
      }
      catch(error)
      {
        console.error(error);
      }

      try{
            
            const res=await axios.post(`${baseUrl}/sms`,{
                phoneNumber:mobile,
                message:`Hello ${user}, Welcome to Splitwise your friend ${mainUser} has added to the group called ${name}`
              },
            {
              headers: {
                  'Content-Type': 'application/json'
                       }
           });   
           alert(res.data);

      }
      catch(error)
      {
        console.log(error);
      }

    }
  
    const images=[ photo,img1,img2,img3];
    const flag= Number(localStorage.getItem("flag"));
    console.log(flag);
    console.log(check);

    const handleAdd=()=>
    {
       setModel(true);
    }
    const handleExpenses=async ()=>
    {
        setModels(true);
          try {
            const res = await axios.post(`${baseUrl}/id?groupId=${groupId}`);
            setCheck(res.data); 
              } 
            catch (error) {
                console.error(error);
            }

        try{
               const res=await axios.post(`${baseUrl}/memberName?groupId=${groupId}`);
               const data=res.data;
               if(data)
               {
                  setUsers(data);
               }
               console.log(res.data);
               console.log(users);

        }
        catch(error)
        {
           console.error(error);
        }
      }

      const handleExpenseInput = (e, index) => {
        const { value } = e.target;
        setAddMoney(prevAddMoney => {
          const updatedAddMoney = [...prevAddMoney];
          updatedAddMoney[index] = { ...updatedAddMoney[index], money: Number(value) }; 
          return updatedAddMoney;
        });
      };
        const handleexpenseShare=async ()=>
        {
           setModels(false);
           console.log({
            groupId: groupId,
            description: desc,
            amount: amt,
            paidBy: paidby,
            SplitBy: splitby,
            CreatedAt: new Date(),
          });
          let subs=0;
          let sum=0;
          for(let i=0;i<addMoney.length;i++)
            {
                 sum=sum+Number([addMoney[i].money]);
            }
            console.log(sum);
            if(sum>amt)
            {
                 subs=sum-amt;
                 setModels(true);
                 setSub(`Sum of entered values (${sum}) exceeds the amount (${amt}`);
            }
            else if(sum<amt)
            {
               subs=amt-sum;
               setModels(true);
               setSub(`Sum of entered values (${sum}) is less than the amount (${amt}`);
            }
            console.log(sub);
            console.log(subs);
            if((subs>=0 && splitby==="Percentage") ||(subs===0 && splitby==="Unequally") || (splitby==="equally" || subs===null))
            {
          try
          {
               setSub(null);
               const response=await axios.post(`${baseUrl}/id?groupId=${groupId}`);

                const res1=await axios.post(`${baseUrl}/expense`,
                  {
                    groupId:groupId,
                    description:desc,
                    amount:amt,
                    paidBy:paidby,
                    splitBy:splitby,
                    createdAt:new Date() 
                  }
                )
                if(res1.data!==null)
                  {
                    alert("Expense Added")
                    console.log(res1.data);
                  }

                  const {expId,amount,paidBy,splitBy,description,createdAt}=res1.data;
                  const exp=res1.data;
                 
              if(splitBy==="equally")
              {
                  console.log("equally");
                  const bal=amount/(response.data+1);
                  console.log(bal);
                  
                  const newUser = "you"; 
                  const updatedUsers = [...users, newUser]; 
                  setUsers(updatedUsers);
                  
                  console.log(paidBy);
                  const newOwed = { [paidBy]: bal};
                  const newPaid = { [paidBy]: amount };

                  updatedUsers.map((us) => {
                      if (us !== paidBy) {
                          newOwed[us] = bal;
                          newPaid[us] = 0;
                      }
                });
                setOwed(newOwed);
                setPaid(newPaid);
                console.log(owed);
                console.log(paid);
                console.log(users);
                const expenseShareData = updatedUsers.map((member) => ({
                expId: expId,
                memberName: member, 
                owed: newOwed[member],
                paid: newPaid[member],
               
            
              }));
              setModels(false);
              console.log(expenseShareData);
              const res=await axios.post(`${baseUrl}/expenseShare`,expenseShareData);

              const res2=await axios.post(`${baseUrl}/owes?id=${exp.expId}`);
              const res3=await axios.post(`${baseUrl}/pays?id=${exp.expId}`);
              const owe = Array.isArray(res2.data) ? res2.data : [res2.data];
              const pay = Array.isArray(res3.data) ? res3.data : [res3.data];
              const createdDate = new Date(exp.createdAt);
              const year = createdDate.getFullYear();
              const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(createdDate);
              const day = createdDate.getDate();

              const updatedExpense = {
                ...exp,
                year,
                month,
                day,
                owes: Array.isArray(owe) ? owe : [owe], 
                pays: Array.isArray(pay) ? pay : [pay],
        };
         console.log(updatedExpense);
             setData((prevData) => [...prevData, updatedExpense]);
             console.log(data);
          }
          
          else if(splitBy==="Unequally")
          {
               let sum=0;
               setSub(null);
               console.log("unequally");
               for(let i=0;i<addMoney.length;i++)
               {
                    sum=sum+Number([addMoney[i].money]);
               }
               console.log(sum);
               let sub=0;
               if(sum>amount)
               {
                    sub=sum-amount;
                    setModels(true);
                    setSub(`Sum of entered values (${sum}) exceeds the amount (${amount}`);
               }
               else if(sum<amount)
               {
                  sub=amount-sum;
                  setModels(true);
                  setSub(`Sum of entered values (${sum}) is less than the amount (${amount}`);
               }
               else
               {
                const newPaid = { [paidBy]: amount };
                users.map((us) => {
                  if (us == paidBy) {
                      console.log("us");
                      newPaid[us] = amount;
                  }
                  else
                  {
                    newPaid[us] = 0;
                  }
                });
                console.log(addMoney);
                const expenseShareData = users.map((member,index) => ({
                  expId: expId,
                  memberName: member, 
                  owed: addMoney[index]?.money,
                  paid: newPaid[member],
                
                }));
                console.log(expenseShareData);
               try{
                const res=await axios.post(`${baseUrl}/expenseShare`,expenseShareData);

                const res2=await axios.post(`${baseUrl}/owes?id=${exp.expId}`);
                const res3=await axios.post(`${baseUrl}/pays?id=${exp.expId}`);
                const owe = Array.isArray(res2.data) ? res2.data : [res2.data];
                const pay = Array.isArray(res3.data) ? res3.data : [res3.data];
                const createdDate = new Date(exp.createdAt);
                const year = createdDate.getFullYear();
                const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(createdDate);
                const day = createdDate.getDate();

                const updatedExpense = {
                  ...exp,
                  year,
                  month,
                  day,
                  owes: Array.isArray(owe) ? owe : [owe], 
                  pays: Array.isArray(pay) ? pay : [pay],
          };
              setData((prevData) => [...prevData, updatedExpense]);
               }
               catch(error)
               {
                 console.error(error);
               }
              }
          }
          else if(splitBy==="Percentage")
           {
            let sum=0;
            setSub(null);
            console.log("Percentage");
            for(let i=0;i<addMoney.length;i++)
            {
                 sum=sum+Number([addMoney[i].money]);
            }
            console.log(sum);
             if(sum>100)
             {
              console.log("greater than 100");
              setSub(`Sum of entered values ${sum} exceeds the amount ${amt}`);
             }
             else if(sum<100)
             {
              console.log("less than 100");
              setSub(`Sum of entered values ${sum} is less than the amount ${amt}`);
             }
             else if(sum===100){
              console.log("equals to 100");
              const newPaid = { [paidBy]: amount };
              users.map((us) => {
                if (us == paidBy) {
                    console.log("us");
                    newPaid[us] = amount;
                }
                else
                {
                  newPaid[us] = 0;
                }
              });
              const expenseShareData = users.map((member,index) => ({
                expId: expId,
                memberName: member, 
                owed: (amount*(addMoney[index]?.money))/100,
                paid: newPaid[member],
               
              }));
              console.log(expenseShareData);
             try{
                   const res=await axios.post(`${baseUrl}/expenseShare`,expenseShareData);

                   const res2=await axios.post(`${baseUrl}/owes?id=${exp.expId}`);
                    const res3=await axios.post(`${baseUrl}/pays?id=${exp.expId}`);
                    const owe = Array.isArray(res2.data) ? res2.data : [res2.data];
                    const pay = Array.isArray(res3.data) ? res3.data : [res3.data];
                    const createdDate = new Date(exp.createdAt);
                    const year = createdDate.getFullYear();
                    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(createdDate);
                    const day = createdDate.getDate();

                    const updatedExpense = {
                      ...exp,
                      year,
                      month,
                      day,
                      owes: Array.isArray(owe) ? owe : [owe], 
                      pays: Array.isArray(pay) ? pay : [pay],
              };
                  setData((prevData) => [...prevData, updatedExpense]);
                }
             catch(error)
               {
               console.error(error);
               }
             }
               
           }
        }
          catch(error)
          {
             console.error(error);
          }
        }
       
        setModels(false);
    }
    const handleReset= async()=>{
      const res=await axios.post(`${baseUrl}/id?groupId=${groupId}`);
       
        if((res.data)===0)
        {
             setCheck(0);
        }
        else
        {
          setCheck(res.data);
        }
       setDetails(false);
    }
   
    const handleDetails= async (expid)=>{
          setDetails(true);
          try
          {
            console.log(expid);
            const res=await axios.post(`${baseUrl}/draftshare?id=${expid}`);
            const res1=await axios.post(`${baseUrl}/expenses?id=${expid}`);
           console.log(res.data);
           console.log(res1.data);
          setFetch({
            description: res1.data.description,
            paidBy: res1.data.paidBy,
            splitBy: res1.data.splitBy,
          });
          const{memberName,owed,paid}=res.data;
          setFlow((Array.isArray(res.data) ? res.data : []));
          }
          catch(error)
          {
             console.error(error);
          }
         
    }
    const[settle,setSettle]=useState(false);
    const[res,setRes]=useState([]);
    const[response,setResponse]=useState([]);

    const handleSettle=async ()=>{
           
            console.log(groupId);
           const response=await axios.post(`${baseUrl}/getExpId?id=${groupId}`);
           const id=response.data;
           const res=await axios.post(`${baseUrl}/settledata?ids=${id.join(',')}`);
           const m1=res.data.m1;
           const m2=res.data.m2;
           setRes(res.data.m1);
          setResponse(res.data.m2);
           console.log(res.data.m1);
           console.log(res.data.m2);
           
           for (const m of m1) {
            for (const mm of m2) {
              if (m[0] === mm[0]) {
                let money = m[1] - mm[1];
      
                if (money > 0) {
                  m[1] = money;
                  mm[1] = 0;
                } else if (money < 0) {
                  mm[1] = -money;
                  m[1] = 0;
                } else {
                  await axios.post(`${baseUrl}/getName?name=${m[0]}`);
                  setRes((prev) => prev.filter((item) => item[0] !== m[0]));
                  setResponse((prev) => prev.filter((item) => item[0] !== mm[0]));
                }
              }
            }
          }
           
           setSettle(true);
    }
    const[count,setCount]=useState([]);
    const handleCount= async(index,name)=>{
      setCount((previtem)=>{
         if(!previtem.includes(index))
         {
            return[...previtem,index]
         }
         return previtem;
      });
      const res=await axios.post(`${baseUrl}/getName?name=${name}`);
    }
    const[b,setB]=useState([]);
    const handleResp=async(index,name)=>{
      setB((previtem)=>{
        if(!previtem.includes(index))
        {
           return[...previtem,index]
        }
        return previtem;
     });
     const res=await axios.post(`${baseUrl}/resetdata?name=${name}`);
    }
    const[total,setTotal]=useState(false);
    const[one,setOne]=useState();
    const[two,setTwo]=useState();
    const[three,setThree]=useState();
    const handleTotal=async()=>{
      try{
        setTotal(true);
         const res=await axios.post(`${baseUrl}/spending?gId=${groupId}`);
         console.log(res.data.ids);
         console.log(res.data.obj);
         const ids=res.data.ids;
         const id=ids.map(id=>id);
         const obj=res.data.obj;
         setOne(obj[0]);
         setTwo(obj[1]);
         const share=await axios.post(`${baseUrl}/summary?ids=${id.join(',')}`);
         setThree(share.data);
      }
      catch(error)
      {
         console.log(error);
      }
    }

    // const passid = "12345"; // Example unique identifier
    const shareableLink = `${window.location.origin}/people/${groupId}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareableLink);
        alert("Link copied to clipboard!");
    };

    useEffect(() => {
        // Initialize Bootstrap Tooltip
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, []);
    
    const[balance,setBalance]=useState([]);
    const handleBalance=async()=>{
      setOverallbal(true);
      try{
           const response=await axios.post(`${baseUrl}/getExpId?id=${groupId}`);
           const id=response.data;
           const res=await axios.post(`${baseUrl}/getBalance?ids=${id.join(',')}`); 
           setBalance(res.data);
           console.log(res.data);

      }
      catch(err)
      {
         console.error(err);
      }
       
    }
    
  return (
    <>
       {/* <Header/> */}
       <Navbar className='navbar' expand="sm" style={{ backgroundColor: 'white', borderBottom: "2px solid #333" }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Navbar.Brand as={Link} to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={split} height={80} width={120} style={{ marginTop: '10px', display: 'inline-block',marginLeft:'-80px' }} alt="Splitwise logo" />
        </Navbar.Brand>
      </Container>
    </Navbar>
       <div>
       <img src={img} style={{width:'100%',height:'300px',position:'relative'}}></img>
       <div style={{ top: '350px', left: '40px',width:'200px',height:'140px',backgroundColor:'white',position:'absolute',borderRadius:'15px'}}><img src={img} style={{width:'160px',height:'120px',margin:'10px',borderRadius:'15px'}}></img></div>
       </div>
       <p style={{textAlign:'left',marginLeft:'40px',marginTop:'80px',fontSize:'50px'}}>{name}</p>
       {(flag===1 || check>0) && <Row>
        <Col>
          {Array.from({ length: num || check}, (_, index) => (
                        <div style={{marginLeft:'200px'}}>
                        <div key={index} style={{ height: '50px', width: '50px', borderRadius: '30px', backgroundColor: 'white', border: '1px solid black',position: 'absolute', marginLeft: `${index * 25}px`, zIndex: index,}}>
                            <img src={images[index % images.length]} style={{ height: '40px', width: '40px', borderRadius: '25px', marginTop: '3.5px'}} alt={`Member ${index + 1}`} />
                        </div>  
                        </div>           
          ))}
        </Col>
        <Col>
        <Add style={{fontSize:'50px',color:'#3CB371',marginLeft:'-1300px'}} onClick={handleAdd}/> 
        </Col>
       </Row>}
       <Row style={{marginTop:'40px'}}>
       <Col>
       <Button style={{backgroundColor:'white',width:'200px',height:'50px',color:'black',fontSize:'20px',borderColor:'grey',boxShadow:'10px 10px 18px black'}} onClick={handleSettle}>Settle up</Button>
       </Col>
         <Col>
         <Button style={{backgroundColor:'white',width:'200px',height:'50px',color:'black',fontSize:'20px',borderColor:'grey',boxShadow:'10px 10px 18px black'}} onClick={handleBalance}>Balances</Button>
         </Col>
         <Col>
         <Button style={{backgroundColor:'white',width:'200px',height:'50px',color:'black',fontSize:'20px',borderColor:'grey',boxShadow:'10px 10px 18px black'}} onClick={handleTotal}>Totals</Button>
         </Col>
       </Row>

       {data.map((datas,index)=>(
        <div key={index}>
       { (index === 0 || data[index].month !== data[index - 1].month || data[index].year !== data[index - 1].year) && <p style={{fontSize:'30px',marginTop:'40px',marginLeft:'-1050px'}}>{datas.month}{" "}{datas.year}</p>}
        <div style={{height:'50px',width:'50px',border:'2px solid black',marginLeft:'35px',fontSize:'25px',marginTop:'30px'}}>{datas.day}</div>
         {/* <AssignmentOutlinedIcon style={{fontSize:'60px',color:'#3CB371',marginLeft:'-1000px',marginTop:'-70px'}}/> */}
        <p style={{marginTop:'-50px',marginLeft:'-900px',fontWeight:'bold',fontSize:'20px',cursor:'pointer'}} onClick={()=>handleDetails(datas.expId)}>{datas.description}</p>
        <p style={{marginLeft:'-900px',marginTop:'-20px'}}>{datas.paidBy} paid $ {datas.amount}.00</p>
        {/* <p>{datas.owes[index]}</p> */}
        
       {((datas.owes[index]>=0) && datas.paidBy=="you" && datas.owes[index]!=0)?<p style={{color:'green',marginLeft:'900px',marginTop:'-50px',fontSize:'15px'}}>you lent<br></br>${datas.amount-datas.owes[index]}</p>:
        <p style={{color:'red',marginLeft:'900px',marginTop:'-50px'}}>you borrowed<br></br>${datas.owes[index]}</p>
       }
         </div>
        ))}
      
         {(flag===0 && check===undefined) && <div style={{marginBottom:'50px'}}>
       <div style={{height:'60px',width:'70px',backgroundColor:'#B9F6CA',borderRadius:'48%',marginLeft:'500px',marginTop:'60px'}}>
       <GroupAddIcon style={{fontSize:'45px',color:'#3CB371',paddingTop:'10px'}}></GroupAddIcon>
       </div>
       <h3 onClick={handleshow} style={{color:'#3CB371',marginTop:'-50px',marginLeft:'100px',cursor:'pointer'}}>Add group members</h3>
       </div>}
          
       <div style={{height:'60px',width:'70px',backgroundColor:'#B9F6CA',borderRadius:'48%',marginLeft:'500px',marginTop:'50px'}} >
       <LinkIcon style={{fontSize:'45px',color:'#3CB371',paddingTop:'10px'}} data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Copy Link" onClick={copyToClipboard} />
       </div>
       <h3 style={{color:'#3CB371',marginTop:'-50px',marginBottom:'50px',marginLeft:'40px'}}>Share group link</h3>
       
       <div style={{ display: 'flex', alignItems: 'center',borderRadius:'50px',backgroundColor:'#3CB371',width:'200px' ,marginLeft:'1100px',marginBottom:'50px',marginTop:'40px'}}>
        <EditNoteIcon style={{color:'white',paddingLeft:'20px',fontSize:'50px'}}/>
        <h5 style={{color:'white',marginLeft:'10px'}} onClick={handleExpenses}>Add Expense</h5>
      </div>
      <Modal show={model} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Group Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
                <input type='text' placeholder='Enter Name' name="user" onChange={handleChange} style={{marginTop:'20px', width:'300px',marginLeft:'90px',borderRadius:'20px'}} required></input><br></br>
                <input type='text' placeholder='Enter Email' name="emailId" onChange={handleChange} style={{marginTop:'20px', width:'300px',marginLeft:'90px',borderRadius:'20px'}} required></input><br></br>
                <input type='text' placeholder='Enter Mobile Number' name="Number" onChange={handleChange} style={{marginTop:'20px', width:'300px',marginLeft:'90px',borderRadius:'20px'}} required></input>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/people"><Button variant="secondary" onClick={handleClose}>
            Close
          </Button></Link>
          <Link to="/people" state={{ groupName: name, groupImg: img, id: groupId}}><Button variant="primary" onClick={handleMember}>
            Save changes
          </Button></Link>
        </Modal.Footer>
      </Modal>
    
      <Modal show={models} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:'center',top:'40px'}}>
                <div><DescriptionIcon style={{fontSize:'30px'}}/><input type="text" placeholder='Enter a description' name='desc' onChange={handleChange} ></input></div><br></br>
                <div><CurrencyRupeeIcon style={{fontSize:'30px'}}/><input type='text' placeholder='0.00' name='amount' onChange={handleChange} ></input></div>
                 <div style={{display:'flex',alignItems:'center',marginTop:'10px',marginLeft:'80px'}}>
                <p>Paid by</p>
                <select style={{marginLeft:'10px',textAlign:'center'}} onChange={handleChange} name="paidBy">
                <option>Choose</option>
                <option>you</option>
                  {users && users.map((user,index)=>(
                        <option key={index} style={{color:'black'}}>{user}</option> 
                  ))}
                </select>
                <p  style={{marginLeft:'8px'}}>and split</p>
                <select style={{marginLeft:'10px'}} onChange={handleChange} name="splitBy">
                  <option>Choose</option>
                  <option>equally</option>
                  <option>Unequally</option>
                  {/* <option>Percentage</option> */}
                </select>
            </div>
           {(splitby==="Unequally" || splitby==="Percentage") && <div>
              {users.map((user,index)=>(
                <>
                  <div style={{display:'flex',marginTop:'20px'}}>
                 <p style={{marginLeft:'100px'}}>{user}</p>
                 <CurrencyRupeeIcon style={{position:'absolute',marginLeft:'280px'}}/>
                 <input type="text" style={{width:'100px',position:'absolute',marginLeft:'300px'}}  onChange={(e) => handleExpenseInput(e,index)}></input>
                 </div>
                 </>
              ))}
              {(sub) &&<p style={{color:'red'}}>{sub}</p>}
              </div>}
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} >
            Close
          </Button>
          <Button variant="primary" onClick={handleexpenseShare}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer/>

      <Modal show={detail} onHide={handleReset} centered>
        <Modal.Header closeButton>
          <Modal.Title>Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
                 <p><span style={{fontWeight:'bold'}}>Expense Description:</span>{fetch.description}</p>
                 <p><span style={{fontWeight:'bold'}}> Paid By:</span>{fetch.paidBy}</p>
                 <p><span style={{fontWeight:'bold'}}>Split By:</span>{fetch.splitBy}</p>
                 <p style={{fontWeight:'bold'}}>Members Name and Their Contribution:</p>
                 <Row style={{fontWeight:'bold'}}>
                  <Col>Member Name</Col>
                  <Col>Owed Amount</Col>
                  <Col>Paid Amount</Col>
                 </Row>
                 
                 {flow.map((d, index) => (
                  <p key={index}>
                     <Row>
                     <Col sm={4}>{d.memberName}</Col>
                     <Col sm={4}>{d.owed}</Col>
                     <Col>{d.paid}</Col>
                    {/* {d.memberName}: Owed {d.owed} Paid {d.paid} */}
                    </Row>
                  </p>
                ))}
                
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/people" state={{ groupName: name, groupImg: img, id: groupId}}><Button variant="secondary" onClick={handleReset}>
            Close
          </Button></Link>
        </Modal.Footer>
      </Modal>

      <Modal show={settle} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Select a balance to Settle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <div>
                 {res.map((resp,index)=>(
                     <div key={index}>
                      { resp[0]!=='you'&& resp[1]>0 &&<Row>
                        <Col>
                        <img src={grey} style={{height:'50px',width:'50px',borderRadius:'30px'}}></img>
                        </Col>
                        <Col> <p>{resp[0]}</p></Col>
                        <Col><p style={{color:'#3CB371'}}>you are owed</p></Col>
                        <Col><p>${resp[1]}</p></Col>
                        <Col><button onClick={() => handleCount(index,resp[0])}>Settle</button></Col>
                        <Col>{count.includes(index) && <DoneIcon style={{color:'blue'}}/>}</Col>

                      </Row>}
                     </div>
                 ))}
                 {response.map((res,index)=>(
                   <div key={index}>
                    {res[1]>0 &&<Row>
                    <Col>
                        <img src={grey2} style={{height:'50px',width:'50px',borderRadius:'30px'}}></img>
                        </Col>
                     <Col><p>{res[0]}</p></Col>
                     <Col><p style={{color:'red'}}>you owe</p></Col>
                     <Col><p>${res[1]}</p></Col>
                     <Col><button onClick={() => handleResp(index,res[0])}>Settle</button></Col>
                     <Col>{b.includes(index) && <DoneIcon style={{color:'blue'}}/>}</Col>

                    </Row>
                    }
                   </div>
                 ))}
            </div>
            {res.length<=0 && response.length<=0 &&<p>Nothing have to Settle</p>}
        </Modal.Body>
        <Modal.Footer>
          <Link to="/people" state={{ groupName: name, groupImg: img, id: groupId}}><Button variant="secondary" onClick={handleClose}>
            Close
          </Button></Link>
        </Modal.Footer>
      </Modal>
      

       <Modal show={total} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{groupName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{textAlign:'center'}}> 
                  <p>TOTAL GROUP SPENDING</p>
                  <p style={{fontWeight:'bold'}}>${one}</p>
                  <p>TOTAL YOU PAID FOR</p>
                  <p style={{fontWeight:'bold'}}>${two}</p>
                  <p>YOUR TOTAL SHARE</p>
                  <p style={{fontWeight:'bold'}}>${three}</p>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/people" state={{ groupName: name, groupImg: img, id: groupId}}><Button variant="secondary" onClick={handleClose}>
            Close
          </Button></Link>
        </Modal.Footer>
      </Modal> 

      <Modal show={overallbal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Group Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <table>
                  <tr>
                    <th>Member Name</th>
                    <th>Owed</th>
                    <th>Paid</th>
                    <th>Net balance</th>
                  </tr>
                  
                {balance.map((bal,index)=>(
                    <tr>
                    <td>${bal[0]}</td>
                    <td>${bal[1]}</td>
                    <td>${bal[2]}</td>
                    {bal[3]<0?<td>Owes ${-bal[3]}</td>:
                    <td>Owed ${bal[3]}</td>}
                 </tr>
                ))
                }
               
                </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> 
    </> 
  )
}

export default People;