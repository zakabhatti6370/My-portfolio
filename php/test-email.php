<?php
// Simple mail test
if(mail('zakaullahbhatti7@gmail.com', 'Test Subject', 'Test Message', 'From: test@localhost.com')) {
    echo "Mail function works!";
} else {
    echo "Mail function failed.";
}
?>