function ProfileInformation (props) {
    return <>
  <ul>
                <li>Networks: {props.data && props.data.information.networks}</li>
                <li>Relatinship Status: {props.data && props.data.information.relationshipStatus}</li>
                <li>Birthday: {props.data && props.data.information.birthday}</li>
                <li>City: {props.data && props.data.information.city}</li>
                <li> Website: {props.data && props.data.information.website}</li>
            </ul>
    </>
    
    ;
  }

export default ProfileInformation