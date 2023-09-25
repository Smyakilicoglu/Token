import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

//HashMap kullanarak kimin tokenlerden ne kadar para kazandığını öğrenmemiz gerekir.
//https://internetcomputer.org/docs/current/motoko/main/base/HashMap
//HashMap.HashMap<Text, Nat>(1, Text.equal, Text.hash); Parantez içi === (Başlangıç boyutu, anahtar eşitliği kontrol, anahtarı karştırma -hash-)
//anahtar eşitliği kontrol ===  Bakiyeye verilen anaparanın deplodaki anaparaya eş değer olması gerek.
actor Token {

    var owner: Principal = Principal.fromText("ipryq-wpxu3-ons7g-juuk3-5j37o-yfpfy-zj3nq-2wkb7-jxzoq-yjkun-qae"); //Ben müdürüm dfx identity get-principal
    var totalSupply : Nat = 1000000000;
    var symbol: Text = "TSD"; //Para birimi sembolü

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash); //Ben ve miktar bağlantı halinde olmalıyız.

    //owner = Sahip ana anahtar totalSupply (toplam arz) = değer
    //Ana para bakiye defetine eklendi.
    balances.put(owner, totalSupply);

    //Bakiyeler defterinde kişi kontrolü.
    public query func BalanceOf(who: Principal): async Nat {

        let balance: Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
    };

    return balance;
    };

    //Readme'ye git...
    public query func getSymbol() : async Text {
        return symbol;
    };
    
    public shared(msg) func payOut(): async Text {
        Debug.print(debug_show(msg.caller)); //dfx canister call token payOut //ipryq-wpxu3-ons7g-juuk3-5j37o-yfpfy-zj3nq-2wkb7-jxzoq-yjkun-qae
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            balances.put(msg.caller, amount);
               return "Seccess"; //2vxsx-fae
        } else {
            return "Already Clamied"
        }
        
    };

    public shared(msg) func transfer(to: Principal, amount: Nat) :async Text {
        //fromAccount - Amount
        //toAccount + Amount
        let fromBalance = await BalanceOf(msg.caller);
        if (fromBalance > amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance =await BalanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);
            
            return "Success"
        } else {
            return "Insufficient Funds"
        }
        //let result = await payOut(); //rrkah-fqaaa-aaaaa-aaaaq-cai
    }
};