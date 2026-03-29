import Migration "migration";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";

// Use migration module for upgrade
(with migration = Migration.run)
actor {
  // Type definitions
  public type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  // Storage
  let submissions = Map.empty<Nat, ContactSubmission>();
  var nextId = 0;

  func getSubmissionInternal(id : Nat) : ContactSubmission {
    switch (submissions.get(id)) {
      case (?submission) { submission };
      case (null) {
        Runtime.trap(
          "Submission with id " # id.toText() # " does not exist."
        );
      };
    };
  };

  // Add new contact submission
  public shared ({ caller }) func submitContact(form : ContactSubmission) : async Nat {
    let id = nextId;
    submissions.add(id, form);
    nextId += 1;
    id;
  };

  // Get all contact submissions
  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.values().toArray();
  };

  // Get specific submission by id
  public query ({ caller }) func getSubmission(id : Nat) : async ContactSubmission {
    getSubmissionInternal(id);
  };

  // Delete submission by id
  public shared ({ caller }) func deleteSubmission(id : Nat) : async () {
    ignore getSubmissionInternal(id);
    submissions.remove(id);
  };
};
