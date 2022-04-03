import Birthday from '../images/birthday-cake.png'
import Work from '../images/briefcase.png'
import City from '../images/condo.png'
import Website from '../images/global.png'
import Heart from '../images/heart.png'


function ProfileInformation(props) {
  return <>
    <ul>
      <li><img src={Work} />Networks: {props.data && props.data.information.networks}</li>
      <li><img src={Heart} />Relatinship Status: {props.data && props.data.information.relationshipStatus}</li>
      <li><img src={Birthday} />Birthday: {props.data && props.data.information.birthday}</li>
      <li><img src={City} />City: {props.data && props.data.information.city}</li>
      <li><img src={Website} />Website: {props.data && props.data.information.website}</li>
    </ul>
  </>

    ;
}

export default ProfileInformation