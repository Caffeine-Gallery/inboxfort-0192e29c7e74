import Bool "mo:base/Bool";

import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Error "mo:base/Error";
import Result "mo:base/Result";

actor {
    // Store user credentials (In a real application, passwords should be hashed)
    private let users = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);
    
    // Initialize with a test user
    users.put("test@example.com", "password123");

    // Login function
    public shared query func login(email: Text, password: Text) : async Bool {
        switch (users.get(email)) {
            case (?storedPassword) {
                return storedPassword == password;
            };
            case null {
                return false;
            };
        };
    };
}
