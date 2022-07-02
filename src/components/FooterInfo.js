export default function FooterInfo(){
    return (
        <div className="footer-msg">
            <div className="msg-top">
                <p className="main-title">Essai gratuit</p>
                <p>30 minutes d'appels restantes dans votre période d'essai</p>
            </div>
            <div className="msg-body">
                <div className="left">
                    <div className="bar"></div>
                    <div className="min-left">
                        <p>30 min</p>
                        <p>0 min</p>
                    </div>
                </div>
                <div className="right">
                    <p>Choisir un plan</p>
                </div>
            </div>
        </div>
    )
}