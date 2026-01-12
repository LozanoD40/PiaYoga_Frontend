import Instagram from '../../assets/Ambientacion/instagram.svg'
import Facebook from '../../assets/Ambientacion/facebook.svg'
import WhatsApp from '../../assets/Ambientacion/whatsapp.svg'
import Youtube from '../../assets/Ambientacion/youtube.svg'

const Card = () => {
  return (
    <div className="card-footer">
      <span>Mis Redes</span>

      <div className="contactame">
        <a
          href="https://www.instagram.com/pia_yoga_bienestar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} alt="Instagram Pia Yoga" />
        </a>

        <a
          href="https://www.facebook.com/pia.yoga.bienestar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} alt="Facebook Pia Yoga" />
        </a>

        <a
          href="https://wa.me/593993198337"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={WhatsApp} alt="WhatsApp Pia Yoga" />
        </a>

        <a
          href="https://www.youtube.com/watch?v=h05YzRGOk2M"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Youtube} alt="Youtube Pia Yoga" />
        </a>
      </div>
    </div>
  )
}

export default Card
