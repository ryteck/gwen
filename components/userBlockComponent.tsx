import { FC, useState } from 'react'
import Style from '../styles/components/userBlockComponentStyle'
import { FaCrown, FaRegSave, FaSyncAlt, FaTrash, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import api from '../libs/api'

interface UserBlockInterface {
    id: string | number;
    username: string;
    firstname: string;
    lastname: string;
    administrador: boolean;
}

const UserBlock: FC<UserBlockInterface> = props => {
  const { id, username, firstname, lastname, administrador } = props

  const [getUsername, setUsername] = useState(username)
  const [getFirstname, setFirstname] = useState(firstname)
  const [getLastname, setLastname] = useState(lastname)
  const [getAdministrador, setAdministrador] = useState(administrador)
  const [getDestroyed, setDestroyed] = useState(false)

  async function switchUserAdm () {
    const newAdmValue = !getAdministrador
    try {
      await api
        .patch(`users/patch/changeLevel/${id}`, { administrador: newAdmValue })
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => { throw error })
      setAdministrador(newAdmValue)
    } catch (error) {
      toast.error(String(error))
    }
  }

  async function saveChanges () {
    const data = {
      username: getUsername,
      firstname: getFirstname,
      lastname: getLastname
    }
    try {
      await api
        .put(`users/rest/update/${id}`, data)
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => { throw error })
      toast.info(`Usuário ${firstname} ${lastname} alterado`)
    } catch (error) {
      toast.error(String(error))
    }
  }

  async function resetUser () {
    try {
      await api
        .patch(`users/patch/resetPassword/${id}`)
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => { throw error })
      toast.info(`senha do usuário ${firstname} ${lastname} resetada`)
    } catch (error) {
      toast.error(String(error))
    }
  }

  async function destroyUser () {
    try {
      await api
        .post(`users/rest/destroy/${id}`)
        .then(({ data }) => {
          const { error } = data
          if (error) throw error
        })
        .catch(error => { throw error })
      toast.info(`Usuário ${firstname} ${lastname} apagado`)
      setDestroyed(true)
    } catch (error) {
      toast.error(String(error))
    }
  }

  return getDestroyed
    ? <></>
    : (
      <Style>
          <div className='block-container'>
            <input placeholder='username' value={getUsername} onChange={e => setUsername(e.target.value)}/>
            <input placeholder='firstname' value={getFirstname} onChange={e => setFirstname(e.target.value)}/>
            <input placeholder='lastname' value={getLastname} onChange={e => setLastname(e.target.value)}/>
            <div className='admSwitch' onClick={switchUserAdm}>
                {
                    getAdministrador
                      ? <FaCrown color="#F2EEDC" size="22" className='iconSelect'/>
                      : <FaUser color="#F2EEDC" size="22" className='iconSelect' />
                }
            </div>
            <div className='block-controlls'>
                <FaRegSave color="#F2EEDC" size="22" className='iconSelect' onClick={saveChanges}/>
                <FaSyncAlt color="#F2EEDC" size="22" className='iconSelect' onClick={resetUser}/>
                <FaTrash color="#F2EEDC" size="22" className='iconSelect' onClick={destroyUser}/>
            </div>
          </div>
      </Style>
      )
}

export default UserBlock
