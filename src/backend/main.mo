import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";



actor {
  public type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  public type GalleryImage = {
    id : Nat;
    title : Text;
    description : Text;
    imageUrl : Text;
  };

  let contacts = Map.empty<Nat, ContactForm>();
  let gallery = Map.empty<Nat, GalleryImage>();

  var nextContactId = 0;
  var nextGalleryId = 0;

  func getGalleryImageInternal(id : Nat) : GalleryImage {
    switch (gallery.get(id)) {
      case (?image) { image };
      case (null) { Runtime.trap("Gallery image with id " # id.toText() # " does not exist. ") };
    };
  };

  func getContactInternal(id : Nat) : ContactForm {
    switch (contacts.get(id)) {
      case (?contact) { contact };
      case (null) { Runtime.trap("Contact with id " # id.toText() # " does not exist. ") };
    };
  };

  // Submit new contact form
  public shared ({ caller }) func submitContact(form : ContactForm) : async Nat {
    let id = nextContactId;
    contacts.add(id, form);
    nextContactId += 1;
    id;
  };

  // Add new gallery image
  public shared ({ caller }) func addGalleryImage(image : GalleryImage) : async Nat {
    let newImage = {
      image with
      id = nextGalleryId;
    };
    gallery.add(nextGalleryId, newImage);
    nextGalleryId += 1;
    newImage.id;
  };

  // Get all contact forms
  public query ({ caller }) func getAllContacts() : async [ContactForm] {
    contacts.toArray().map(func((k, v)) { v });
  };

  // Get all gallery images
  public query ({ caller }) func getAllGalleryImages() : async [GalleryImage] {
    gallery.toArray().map(func((k, v)) { v });
  };

  // Get specific gallery image by id
  public query ({ caller }) func getGalleryImage(id : Nat) : async GalleryImage {
    getGalleryImageInternal(id);
  };

  // Delete gallery image
  public shared ({ caller }) func deleteGalleryImage(id : Nat) : async () {
    ignore getGalleryImageInternal(id);
    gallery.remove(id);
  };

  // Delete contact (not used in frontend but good to have)
  public shared ({ caller }) func deleteContact(id : Nat) : async () {
    ignore getContactInternal(id);
    contacts.remove(id);
  };
};
