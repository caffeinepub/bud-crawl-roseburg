// This migration module will handle upgrading from the old actor state to the new one
import Map "mo:core/Map";
import Nat "mo:core/Nat";

module {
  type OldContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  type OldGalleryImage = {
    id : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  type OldActor = {
    contacts : Map.Map<Nat, OldContactForm>;
    gallery : Map.Map<Nat, OldGalleryImage>;
    nextContactId : Nat;
    nextGalleryId : Nat;
  };

  // New types for just contacts
  type NewContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type NewActor = {
    submissions : Map.Map<Nat, NewContactSubmission>;
    nextId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    // Convert old contact forms to new format with empty phone
    let newSubmissions = old.contacts.map<Nat, OldContactForm, NewContactSubmission>(
      func(_id, oldContact) {
        {
          name = oldContact.name;
          email = oldContact.email;
          phone = "";
          message = oldContact.message;
        };
      }
    );
    {
      submissions = newSubmissions;
      nextId = old.nextContactId;
    };
  };
};
