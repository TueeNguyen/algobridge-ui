type StrategyDTO = {
  // url: str
  // name: str
  // composer_id: str
  // composer_created_at: datetime  # Fix: Use datetime directly
  // version_id: str
  // last_modified_utc: datetime    # Fix: Use datetime directly
  // holdings: List[Dict[str, Any]]  # Fix: Now List is properly imported
  url: string;
  name: string;
  composer_id: string;
  composer_created_at: string; // ISO date string
  version_id: string;
  last_modified_utc: string; // ISO date string
  holdings: Array<{ [key: string]: any }>; // Adjusted to use an array of objects
  id: string; // Added id field for key in React list rendering
};
