function LoginPage() {
   return( <div>
    <h1> Giriş Yap </h1><div>
    <label> E-posta </label>
    <input type="email"
    placeholder="E-posta adresini giriniz"
    className="grup"/>  </div>
   <div> <label> Şifre</label>
    <input type="password"
    placeholder="Şifrenizi giriniz"
    className="grup"/> </div>
    <div> 
        <button> Giriş Yap </button> </div>
        </div>
  );
}
export default LoginPage;